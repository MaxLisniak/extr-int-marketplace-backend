import Router from "express-promise-router";
import { addFavoriteProductController, findFavoriteProductsController, removeFavoriteProductController } from "../controllers/favorites";
const router = Router();

router.post('/', addFavoriteProductController)
router.delete('/', removeFavoriteProductController)
router.get('/:user_id', findFavoriteProductsController)

export default router;