import Router from "express-promise-router";
import {
  findKeywordsController,
  findKeywordByIdController,
  createKeywordController,
  updateKeywordController,
  deleteKeywordController,
} from '../controllers/keywords';

const router = Router();

router.get('/', findKeywordsController);
router.post('/', createKeywordController);
router.get('/:id', findKeywordByIdController);
router.patch('/:id', updateKeywordController);
router.delete('/:id', deleteKeywordController);

export default router;
