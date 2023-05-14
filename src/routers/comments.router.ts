import Router from "express-promise-router";
import verifyToken from '../middleware/verifyToken';
import { CommentsController } from "../controllers/comments.controller";


const router = Router();

router.get('/', CommentsController.find);

router.post('/', [verifyToken, CommentsController.create]);

router.patch('/:id', [verifyToken, CommentsController.updateById]);

router.delete('/:id', [verifyToken, CommentsController.deleteById]);

export default router;
