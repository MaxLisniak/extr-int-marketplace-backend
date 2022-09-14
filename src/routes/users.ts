import express from 'express';
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

const router = express.Router();

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
