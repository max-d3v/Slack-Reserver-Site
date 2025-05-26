import winston from 'winston';
import path from 'path';

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
    return `${level} [${timestamp}] [${service || 'app'}]: ${message} ${
      Object.keys(metadata).length ? JSON.stringify(metadata) : ''
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
    })
  ]
});

// Helper method to log with service context
const loggerService = {
  info: (service: string, message: string, metadata?: any) => logger.info(message, { service, ...metadata }),
  warn: (service: string, message: string, metadata?: any) => logger.warn(message, { service, ...metadata }),
  error: (service: string, message: string, metadata?: any) => logger.error(message, { service, ...metadata }),
  debug: (service: string, message: string, metadata?: any) => logger.debug(message, { service, ...metadata }),
};

export default loggerService;