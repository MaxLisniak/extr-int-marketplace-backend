import Router from "express-promise-router";
import { UsersController } from "../controllers/users.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";

const router = Router();

router.get('/me', [verifyAuthorization, UsersController.findByToken]);
router.get('/:id', UsersController.findById);
router.get('/', UsersController.find);

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/sign-out', UsersController.signOut);
router.post('/refresh', UsersController.handleRefreshToken);
router.post('/favorite-products/:product_id', [verifyAuthorization, UsersController.addFavoriteProduct])

router.patch('/me', [verifyAuthorization, UsersController.updateByToken]);

router.delete('/favorite-products/:product_id', [verifyAuthorization, UsersController.removeFavoriteProduct])
router.delete('/me', [verifyAuthorization, UsersController.deleteByToken]);

export default router;
