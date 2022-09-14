import express from 'express';
import {
  deleteComment,
  getAllComments,
  getCommentById,
  getCommentsForProductId,
  patchComment,
  postComment
} from '../controllers/comments';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getAllComments);
router.get('/for-product/:id', getCommentsForProductId);
router.get('/:id', getCommentById);
router.post('/', [verifyToken, postComment]);
router.patch('/:id', patchComment);
router.delete('/:id', deleteComment);

export default router;
