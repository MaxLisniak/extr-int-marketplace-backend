import Router from "express-promise-router";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.get('/', UsersController.findUsers);
router.get('/refresh', UsersController.handleRefreshToken);
router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/sign-out', UsersController.signOut);
router.get('/:id', UsersController.findUserById);
router.patch('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

export default router;
