
import {
  deleteComment,
  getAllComments,
  getCommentById,
  // getCommentsForProductId,
  patchComment,
  postComment
} from '../controllers/comments';
import verifyToken from '../middleware/verifyToken';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllComments);
// router.get('/for-product/:id', getCommentsForProductId);
router.get('/:id', getCommentById);
router.post('/', [verifyToken, postComment]);
router.patch('/:id', patchComment);
router.delete('/:id', deleteComment);

export default router;
