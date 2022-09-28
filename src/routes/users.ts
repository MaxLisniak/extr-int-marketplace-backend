import Router from "express-promise-router";
import {
  signInController,
  signUpController,
  signOutController,
  handleRefreshTokenController,
  findUsersController,
  findUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/users";

const router = Router();

router.get('/', findUsersController);
router.get('/refresh', handleRefreshTokenController);
router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.post('/sign-out', signOutController);
router.get('/:id', findUserByIdController);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
