import Router from "express-promise-router";
import verifyToken from '../middleware/verifyToken';
import { CommentsController } from "../controllers/comments.controller";


const router = Router();

router.get('/', CommentsController.findComments);
router.post('/', [verifyToken, CommentsController.createComment]);
router.get('/:id', CommentsController.findCommentById);
router.patch('/:id', CommentsController.updateComment);
router.delete('/:id', CommentsController.deleteComment);

export default router;
