import express from 'express';
import {
  deleteKeyword,
  getAllKeywords,
  getKeywordById,
  getKeywordsByQuery,
  patchKeyword,
  postKeyword
} from '../controllers/keywords';

const router = express.Router();

router.get('/', getAllKeywords);
router.get('/search', getKeywordsByQuery);
router.get('/:id', getKeywordById);
router.post('/', postKeyword);
router.patch('/:id', patchKeyword);
router.delete('/:id', deleteKeyword);

export default router;
