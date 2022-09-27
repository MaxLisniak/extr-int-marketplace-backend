import { NextFunction, Request, Response } from "express";
import createError from 'http-errors';

const error404Handler = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
}

export default error404Handler;