import { createLogger, format, transports } from "winston";
const {combine, label, json} = format;
import 'winston-daily-rotate-file';

import dotenv from 'dotenv'
dotenv.config()

const { LOG_FILES } = process.env;

//Label
const CATEGORY = "Log Rotation";

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: `${LOG_FILES}/rotate-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});


/**
 *  Basic logger function
 *  - Logs to file rotate-%DATE%.log in logs folder
 */
const Logger = createLogger({
  level: "info",
  format: combine(label({ label: CATEGORY }), json()),
  transports: [fileRotateTransport],
});
  
  export default Logger;