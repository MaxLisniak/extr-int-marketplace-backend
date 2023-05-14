import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { ErrorName } from "../lib/constants";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`(${res.locals?.requestId}) ${err}`)
  if (
    err.name === ErrorName.DBError ||
    err.name === ErrorName.NotNullViolationError ||
    err.name === ErrorName.UniqueViolationError
  ) {
    logger.error(`SQL query: ${err.nativeError.sql}\nSQL error message: ${err.nativeError.sqlMessage}`)
    return res
      .status(400)
      .send({
        error: {
          name: err.name,
          messages: ["Server Error"]
        }
      })
  }
  return res
    .status(400)
    .send({
      error: {
        name: err.name,
        messages: [err.name == ErrorName.ValidationError ? err.message : err.expose ? err.message : "Server Error"]
      }
    })
}

export default errorHandler;