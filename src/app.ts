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
  origin: "http://localhost:3001", // TODO: не надо хордкодить, лучше взять из .env, так же добавь .env.example со всеми переменными, только без значений - это облегчит жизнь тому кто будет поднимать твой проект у себя
  credentials: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev')); // TODO: замени это все одним логером (пуст будет winston, хотя bunyan лучше). Создай middleware которая будет логировать запрос (начало, конец, возможно ошибку), присвой запросу уникальный ID что бы его можно было отслеживать в логах
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/', rootRouter);
app.use(error404Handler); // TODO: это лишнее для API BE, это нжно только для фронта
app.use(errorHandler);

export default app;
