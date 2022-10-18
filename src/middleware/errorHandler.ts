import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("An error occured") // TODO: надеюсь это только для отладки
  console.log(err.name)
  console.log(err)

  if (err.name === 'ValidationError')
    return res
      .status(err.status || 500)
      .send({
        error: {
          name: err.name,
          messages: err.errors
        }
      })
  if (err.name === 'DBError' || err.name === 'NotNullViolationError') {
    console.log(`SQL query: ${err.nativeError.sql}`) // TODO: это должно идти в логи а не в консоль
    console.log(`SQL error message: ${err.nativeError.sqlMessage}`)
    return res
      .status(400)
      .send({
        error: {
          name: err.name,
          messages: [err.nativeError.sqlMessage] // TODO: нельзя покозывать ошибку на фронте - это не секьюрно, вместо этого покажи что-то общее, типа Server Error
        }
      })
  }
  if (err.name === "Error") { // TODO: здесь скорее всего должна быть BadRequest - когда что-то пошло не так, но ты все равно контролируешь ситуцию
    return res
      .status(500) // TODO: код будет 400
      .send({
        error: {
          name: err.name,
          messages: [err.message] // TODO: если ты используешь http-error то там есть флаг expose - если true - показывай message на фронте, если нет - покажи что-то типа Server Error
        }
      })
  }

  return res.sendStatus(err.status || 500); // TODO: кад всегда будет 500 - и ты будешь знать что что-то не так в твоем коде и это надо пофиксить - твой код никогда не должен возврашать 500
}

export default errorHandler;