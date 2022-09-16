import { Router } from 'express';

import indexRouter from './index';
import usersRouter from './users';
import categoriesRouter from './categories';
import subcategoriesRouter from './subcategories';
import productsRouter from './products';
import commentsRouter from './comments';
import pricesRouter from './prices';
import favoritesRouter from './favorites';
import keywordsRouter from './keywords';
import characteristicNamesRouter from './characteristicNames';
import characteristicsRouter from './characteristics';

const rootRouter = Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/categories', categoriesRouter);
rootRouter.use('/subcategories', subcategoriesRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/comments', commentsRouter);
rootRouter.use('/prices', pricesRouter);
rootRouter.use('/favorites', favoritesRouter);
rootRouter.use('/keywords', keywordsRouter);
rootRouter.use('/characteristic_names', characteristicNamesRouter);
rootRouter.use('/characteristics', characteristicsRouter);

export default rootRouter;