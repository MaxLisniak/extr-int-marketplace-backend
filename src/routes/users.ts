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
  addFavoriteProductController,
  removeFavoriteProductController
} from "../controllers/users";

const router = Router();

router.get('/', findUsersController);
router.get('/refresh', handleRefreshTokenController);
router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.post('/sign-out', signOutController);
router.post('/add-favorite', addFavoriteProductController)
router.post('/remove-favorite', removeFavoriteProductController)
router.get('/:id', findUserByIdController);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
