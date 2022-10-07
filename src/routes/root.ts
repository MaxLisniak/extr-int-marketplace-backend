
import indexRouter from './index';
import usersRouter from './users';
import categoriesRouter from './categories';
import productsRouter from './products';
import commentsRouter from './comments';
import keywordsRouter from './keywords';
import attributeNamesRouter from './attributeNames';
import attributeValuesRouter from './attributeValues';
import favoritesRouter from "./favorites"

import Router from "express-promise-router";
const rootRouter = Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/categories', categoriesRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/comments', commentsRouter);
rootRouter.use('/keywords', keywordsRouter);
rootRouter.use('/attribute_names', attributeNamesRouter);
rootRouter.use('/attribute_values', attributeValuesRouter);
rootRouter.use('/favorites', favoritesRouter);

export default rootRouter;