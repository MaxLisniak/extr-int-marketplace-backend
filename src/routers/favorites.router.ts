import Router from "express-promise-router";
import { FavoritesController } from "../controllers/favorites.controller";
const router = Router();


router.post('/', FavoritesController.addFavoriteProduct)
router.delete('/', FavoritesController.removeFavoriteProduct)
router.get('/:user_id', FavoritesController.findFavoriteProducts)

export default router;