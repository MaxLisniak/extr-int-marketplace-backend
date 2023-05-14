import Router from "express-promise-router";
import { UsersController } from "../controllers/users.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get('/refresh', UsersController.handleRefreshToken);
router.get('/:id', UsersController.findById);
router.get('/', UsersController.find);

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/sign-out', UsersController.signOut);
router.post('/favorite-products/:product_id', [verifyToken, UsersController.addFavoriteProduct])

router.patch('/:id', UsersController.updateById);

router.delete('/favorite-products/:product_id', [verifyToken, UsersController.removeFavoriteProduct])
router.delete('/:id', UsersController.deleteById);

export default router;
