import express from 'express';
import {
  deleteFavorite,
  getAllFavorites,
  getFavoriteById,
  getFavoritesForUser,
  patchFavorite,
  postFavorite,
  toggleFavorite,
} from '../controllers/favorites';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getAllFavorites);
router.post('/toggle', [verifyToken, toggleFavorite])
router.get('/for-user', [verifyToken, getFavoritesForUser])
router.get('/:id', getFavoriteById);
router.post('/', postFavorite);
router.patch('/:id', patchFavorite);
router.delete('/:id', deleteFavorite);

export default router;
