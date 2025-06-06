import winston, { loggers } from 'winston';
import { CONSTANTS } from '../constants';
import emailerServices, { EmailerService } from '../emailer/emailerServices';
import path from 'path';

export interface LoggerService {
  info: (message: string, metadata?: any) => void;
  warn: (message: string, metadata?: any) => void;
  error: (message: string, metadata?: any) => void;
  debug: (message: string, metadata?: any) => void;
  critical: (service: string, message: string, metadata?: any) => Promise<void>;
}

export class LoggerServices {
  private loggerService: LoggerService | null = null;
  private alertRateLimit = new Map<string, number>();
  private emailerInitialized = false;

  constructor(private emailer: EmailerService) { }

  public buildLogger() {
    try {
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


      const loggerService = {
        info: (service: string, message: string, metadata?: any) => logger.info(service, message, { ...metadata }),
        warn: (service: string, message: string, metadata?: any) => logger.warn(service, message, { ...metadata }),
        error: (service: string, message: string, metadata?: any) => logger.error(service, message, { ...metadata }),
        debug: (service: string, message: string, metadata?: any) => logger.debug(service, message, { ...metadata }),
        critical: async (service: string, message: string, metadata?: any) => {
          try {
            logger.error(message, { service, level: 'CRITICAL', ...metadata });

            if (!this.emailerInitialized) {
              await this.emailer.ensureInitialized();
              this.emailerInitialized = true;
            }

            await this.sendCriticalAlert(service, message, metadata);
          } catch (error: any) {
            console.error('Failed to send critical alert', { error, service, message, metadata });
          }
        }
      };

      this.loggerService = loggerService;
      console.log('Logger service initialized successfully');
      return loggerService;
    } catch (error: any) {
      throw error
    }
  }

  public getLogger() {
    return this.loggerService;
  }

  private async sendCriticalAlert(service: string, message: string, metadata?: any) {
    const alertKey = `${service}:${message}:${JSON.stringify(metadata)}`;
    const now = Date.now();
    const ALERT_COOLDOWN = CONSTANTS.TIMERS.ALERT_COOLDOWN_MILISECONDS

    // Check if we've already sent this alert recently
    if (this.alertRateLimit.has(alertKey)) {
      const lastSent = this.alertRateLimit.get(alertKey)!;
      if (now - lastSent < ALERT_COOLDOWN) {
        console.warn(`Skipping alert for ${service} due to rate limit`, { service, message });
        return;
      }
    }
    const text = `Critical error has ocurred!`;

    try {
      await this.emailer.sendErrorEmail({
        subject: `🚨 Critical Error in ${service}`,
        text,
        errorMessage: message,
        metadata
      });

      this.alertRateLimit.set(alertKey, now);
    } catch (emailError) {
      console.error('Failed to send critical alert email', { emailError });
    }
  }
}

const loggerService = new LoggerServices(emailerServices);
export const logger = loggerService.buildLogger();
export default logger;