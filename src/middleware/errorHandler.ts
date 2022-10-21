import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`(${res.locals?.requestId}) ${err.name} ${err.errors}`)
  if (
    err.name === 'DBError' ||
    err.name === 'NotNullViolationError' ||
    err.name === 'UniqueViolationError'
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
        messages: [err.name == 'ValidationError' ? err.message : err.expose ? err.message : "Server Error"]
      }
    })
}

export default errorHandler;