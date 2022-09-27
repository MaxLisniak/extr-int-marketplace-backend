
import {
  deleteCommentController,
  getCommentsController,
  getCommentByIdController,
  patchCommentController,
  postCommentController
} from '../controllers/comments';
import verifyToken from '../middleware/verifyToken';

import Router from "express-promise-router";
const router = Router();

router.get('/', getCommentsController);
router.post('/', [verifyToken, postCommentController]);
router.get('/:id', getCommentByIdController);
router.patch('/:id', patchCommentController);
router.delete('/:id', deleteCommentController);

export default router;
