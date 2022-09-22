
import {
  deleteKeywordController,
  getKeywordsController,
  getKeywordByIdController,
  patchKeywordController,
  postKeywordController
} from '../controllers/keywords';

import Router from "express-promise-router";
const router = Router();

router.get('/', getKeywordsController);
router.get('/:id', getKeywordByIdController);
router.post('/', postKeywordController);
router.patch('/:id', patchKeywordController);
router.delete('/:id', deleteKeywordController);

export default router;
