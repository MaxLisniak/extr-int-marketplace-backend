import Router from "express-promise-router";
import { addFavoriteProductController, removeFavoriteProductController } from "../controllers/favorites";
const router = Router();

router.post('/add', addFavoriteProductController)
router.post('/remove', removeFavoriteProductController)

export default router;