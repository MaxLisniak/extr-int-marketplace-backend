import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rootRouter from './routers/root.router';
import errorHandler from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(requestLogger);

app.use('/', rootRouter);
app.use(errorHandler);

export default app;
