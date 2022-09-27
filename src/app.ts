import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import rootRouter from './routes/root';
import errorHandler from './middleware/errorHandler';
import error404Handler from './middleware/404handler';

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/', rootRouter);
app.use(error404Handler);
app.use(errorHandler);

export default app;
