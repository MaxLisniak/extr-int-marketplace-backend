
import {
  deleteKeyword,
  getAllKeywords,
  getKeywordById,
  getKeywordsByQuery,
  patchKeyword,
  postKeyword
} from '../controllers/keywords';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllKeywords);
router.get('/search', getKeywordsByQuery);
router.get('/:id', getKeywordById);
router.post('/', postKeyword);
router.patch('/:id', patchKeyword);
router.delete('/:id', deleteKeyword);

export default router;
