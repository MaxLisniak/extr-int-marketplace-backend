import usersRouter from './users.router';
import categoriesRouter from './categories.router';
import productsRouter from './products.router';
import commentsRouter from './comments.router';
import keywordsRouter from './keywords.router';
import brandsRouter from "./brands.router"

import Router from "express-promise-router";
const rootRouter = Router();

rootRouter.use('/users', usersRouter);
rootRouter.use('/categories', categoriesRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/comments', commentsRouter);
rootRouter.use('/keywords', keywordsRouter);
rootRouter.use('/brands', brandsRouter)

export default rootRouter;