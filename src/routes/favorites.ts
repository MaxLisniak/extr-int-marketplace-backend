import Router from "express-promise-router";
import { addFavoriteProductController, findFavoriteProductsController, removeFavoriteProductController } from "../controllers/favorites";
const router = Router();

router.post('/add', addFavoriteProductController)
router.post('/remove', removeFavoriteProductController)
router.get('/:user_id', findFavoriteProductsController)

export default router;