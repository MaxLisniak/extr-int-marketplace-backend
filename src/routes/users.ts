
import {
  signInController,
  signUpController,
  signOutController,
  handleRefreshTokenController,
  getUsersController,
  getUserByIdController,
  patchUserController,
  deleteUserController
} from "../controllers/users";

import Router from "express-promise-router";
const router = Router();

router.get('/', getUsersController);
router.get('/refresh', handleRefreshTokenController);
router.get('/:id', getUserByIdController);
router.patch('/:id', patchUserController);
router.delete('/:id', deleteUserController);
router.post('/sign-in', signInController);
router.post('/sign-out', signOutController);
router.post('/sign-up', signUpController);

export default router;
