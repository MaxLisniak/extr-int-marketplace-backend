import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`;
});

// logger config
const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' })
  ],
  format: combine(
    timestamp({ format: "MM.DD.YY hh:mm:ss" }),
    myFormat
  ),
});

export default logger;
