import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("An error occured")
  console.log(err.name)

  if (err.name === 'ValidationError')
    return res
      .status(400)
      .send({
        status: "error",
        errorName: err.name,
        errorMessages: err.errors
      })
  if (err.name === 'DBError' || err.name === 'NotNullViolationError') {
    console.log(`SQL query: ${err.nativeError.sql}`)
    console.log(`SQL error message: ${err.nativeError.sqlMessage}`)
    return res
      .status(400)
      .send({
        status: "error",
        errorName: err.name,
        errorMessages: [err.nativeError.sqlMessage]
      })
  }

  return res.sendStatus(err.status || 500);
}

export default errorHandler;