import Router from "express-promise-router";
import verifyToken from '../middleware/verifyToken';
import {
  findCommentsController,
  findCommentByIdController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from '../controllers/comments';

const router = Router();

router.get('/', findCommentsController);
router.post('/', [verifyToken, createCommentController]);
router.get('/:id', findCommentByIdController);
router.patch('/:id', updateCommentController);
router.delete('/:id', deleteCommentController);

export default router;
