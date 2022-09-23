
import {
  signInController,
  signUpController,
  signOutController,
  handleRefreshTokenController,
  getUsersController,
  getUserByIdController,
  patchUserController,
  deleteUserController,
  addFavoriteProductController,
  removeFavoriteProductController
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
router.post('/add-favorite', addFavoriteProductController)
router.post('/remove-favorite', removeFavoriteProductController)

export default router;
