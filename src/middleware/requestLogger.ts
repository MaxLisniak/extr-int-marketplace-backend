import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import logger from '../logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const id = crypto.randomBytes(4).toString("hex");
  res.locals.requestId = id;
  logger.info(`(${id}) ${req.method} ${req.url}`);
  const startHrTime = process.hrtime();
  res.on('finish', function () {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    logger.info(`(${id}) finished with the code ${res.statusCode} (${elapsedTimeInMs}ms)`);
  });
  next()
}