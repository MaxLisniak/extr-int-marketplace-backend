
import indexRouter from './index.router';
import usersRouter from './users.router';
import categoriesRouter from './categories.router';
import productsRouter from './products.router';
import commentsRouter from './comments.router';
import keywordsRouter from './keywords.router';
import attributeNamesRouter from './attribute-names.router';
import attributesController from './attributes.router';
import brandsRouter from "./brands.router"
import attributeToProductRouter from './attribute-to-product.router'

import Router from "express-promise-router";
const rootRouter = Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/categories', categoriesRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/comments', commentsRouter);
rootRouter.use('/keywords', keywordsRouter);
rootRouter.use('/attribute_names', attributeNamesRouter);
rootRouter.use('/attributes', attributesController);
rootRouter.use('/brands', brandsRouter)
rootRouter.use('/attribute-to-product', attributeToProductRouter)

export default rootRouter;