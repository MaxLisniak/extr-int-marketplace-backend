
import indexRouter from './index';
import usersRouter from './users';
import categoriesRouter from './categories';
import productsRouter from './products';
import commentsRouter from './comments';
import keywordsRouter from './keywords';
import attributeNamesRouter from './attributeNames';
import attributeValuesRouter from './attributeValues';
import favoritesRouter from "./favorites"
import brandsRouter from "./brands"
import productToAttributeRouter from './productToAttribute'
import productToCategoryRouter from './productToCategory'
import productToKeywordRouter from './productToKeyword'

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
rootRouter.use('/brands', brandsRouter)
rootRouter.use('/product-to-attribute', productToAttributeRouter)
rootRouter.use('/product-to-category', productToCategoryRouter)
rootRouter.use('/product-to-keyword', productToKeywordRouter)

export default rootRouter;