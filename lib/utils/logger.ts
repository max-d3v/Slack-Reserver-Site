import winston from 'winston';
import path from 'path';
import emailer from '../emailer/emailerServices';
import { CONSTANTS } from '../constants';

const logDir = path.join(process.cwd(), 'logs');

// custom format
const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { timestamp, level, message, service, ...metadata } = info;
    const levelString = `[${level.toUpperCase()}]`;

    return JSON.stringify({
      timestamp,
      levelString,
      service: service || 'app',
      message,
      metadata: Object.keys(metadata).length ? metadata : undefined
    });
  })
);

// colourss
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { timestamp, level, message, service, ...metadata } = info;
    return `${level} [${timestamp}] [${service || 'app'}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''
      }`;
  })
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, `stripe-${new Date().toISOString().split('T')[0]}.log`),
      format: customFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: customFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'critical.log'),
      level: 'error',
      format: customFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 10
    })

  ]
});


const alertRateLimit = new Map<string, number>();
const ALERT_COOLDOWN = CONSTANTS.TIMERS.ALERT_COOLDOWN_MILISECONDS

async function sendCriticalAlert(service: string, message: string, metadata?: any) {

  const alertKey = `${service}:${message}`;
  const now = Date.now();

  // Check if we've already sent this alert recently
  if (alertRateLimit.has(alertKey)) {
    const lastSent = alertRateLimit.get(alertKey)!;
    if (now - lastSent < ALERT_COOLDOWN) {
      logger.warn('alert-rate-limit', `Skipping alert for ${service} - already sent recently`, {
        service,
        message,
        metadata
      });
      return; // Skip sending to avoid spam
    }
  }

  try {
    await emailer.errorEmail({
      subject: `🚨 Critical Error in ${service}`,
      message,
      timestamp: new Date(),
      metadata
    });

    alertRateLimit.set(alertKey, now);
  } catch (emailError) {
    // Don't let email failures break the application
    logger.error('Failed to send critical alert email', { emailError });
  }
}



// Helper method to log with service context
const loggerService = {
  info: (service: string, message: string, metadata?: any) => logger.info(message, { service, ...metadata }),
  warn: (service: string, message: string, metadata?: any) => logger.warn(message, { service, ...metadata }),
  error: (service: string, message: string, metadata?: any) => logger.error(message, { service, ...metadata }),
  debug: (service: string, message: string, metadata?: any) => logger.debug(message, { service, ...metadata }),
  critical: async (service: string, message: string, metadata?: any) => {
    logger.error(message, { service, level: 'CRITICAL', ...metadata });

    //Only send emails in production
    //if (process.env.NODE_ENV === 'production') {
      await sendCriticalAlert(service, message, metadata);
    //}
  }
};

export default loggerService;