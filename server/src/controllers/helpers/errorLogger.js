import winston from "winston";
import "winston-daily-rotate-file";

const log = new winston.transports.DailyRotateFile({
  filename: "./logs/Log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  handleExceptions: true,
  handleRejections: true,
});

const consoleLog = new winston.transports.Console({
  handleExceptions: true,
  handleRejections: true,
});

const errorLogger = winston.createLogger({
  transports: [log, consoleLog],
});

export default errorLogger;
