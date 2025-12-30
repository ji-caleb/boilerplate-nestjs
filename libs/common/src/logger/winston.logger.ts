import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

export const LogLevel = {
  SILLY: 'silly',
  DEBUG: 'debug',
  VERBOSE: 'verbose',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

const customFormat = format.printf(
  ({ timestamp, level, context, message, ...rest }) => {
    return JSON.stringify({
      timestamp,
      level,
      context,
      message,
      ...rest,
    });
  },
);

export const winstonLogger = () => {
  return WinstonModule.createLogger({
    level:
      process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.SILLY,
    format: format.combine(customFormat, format.timestamp(), format.ms()),
    transports: [
      new transports.Console({
        level:
          process.env.NODE_ENV === 'production'
            ? LogLevel.INFO
            : LogLevel.SILLY,
        format: format.combine(
          customFormat,
          format.timestamp(),
          format.ms(),
          format.colorize({ all: true }),
        ),
      }),
    ],
  });
};
