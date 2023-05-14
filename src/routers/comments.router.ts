import Router from "express-promise-router";
import verifyAuthorization from '../middleware/verifyAuthorization';
import { CommentsController } from "../controllers/comments.controller";


const router = Router();

router.get('/', CommentsController.find);

router.post('/', [verifyAuthorization, CommentsController.create]);

router.patch('/:id', [verifyAuthorization, CommentsController.updateById]);

router.delete('/:id', [verifyAuthorization, CommentsController.deleteById]);

export default router;
