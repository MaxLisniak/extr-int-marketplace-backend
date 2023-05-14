import Router from "express-promise-router";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.get('/refresh', UsersController.handleRefreshToken);
router.get('/:id', UsersController.findById);
router.get('/', UsersController.find);

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/sign-out', UsersController.signOut);
router.post('/:user_id/favorite-products/:product_id', UsersController.addFavoriteProduct)

router.patch('/:id', UsersController.updateById);

router.delete('/:user_id/favorite-products/:product_id', UsersController.removeFavoriteProduct)
router.delete('/:id', UsersController.deleteById);

export default router;
