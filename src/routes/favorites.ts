
import {
  deleteFavoriteController,
  getFavoritesController,
  getFavoriteByIdController,
  patchFavoriteController,
  postFavoriteController,
  toggleFavoriteController,
} from '../controllers/favorites';
import verifyToken from '../middleware/verifyToken';

import Router from "express-promise-router";
const router = Router();

router.get('/', getFavoritesController);
router.post('/toggle', [verifyToken, toggleFavoriteController])
router.get('/:id', getFavoriteByIdController);
router.post('/', postFavoriteController);
router.patch('/:id', patchFavoriteController);
router.delete('/:id', deleteFavoriteController);

export default router;
