
import {
  signin,
  signup,
  signout,
  handleRefreshToken,
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser
} from "../controllers/user";

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/:id', getUserById);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);
router.post('/sign-in', signin);
router.post('/sign-out', signout);
router.post('/sign-up', signup);

export default router;
