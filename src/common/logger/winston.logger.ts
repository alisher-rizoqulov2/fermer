import { utilities } from "nest-winston";
import * as winston from "winston";

export const WinstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.label({ label: 'Prismajon' }),
        winston.format.timestamp(),
        utilities.format.nestLike("Fermer")
        // winston.format.printf(({ level, message, label, timestamp }) => {
        //   return `${timestamp} [${label}] ${level}:${message}`;
        // }),
      ),
    }),
    new winston.transports.File({
      filename: "logs/combine.log",
      level: "info",
      format: winston.format.combine(
        winston.format.combine(
          winston.format.label({ label: "Fermer" }),
          winston.format.timestamp(),
          winston.format.json()
        )
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.combine(
          winston.format.label({ label: "Fermer" }),
          winston.format.timestamp(),
          winston.format.json()
        )
      ),
    }),
  ],
};
