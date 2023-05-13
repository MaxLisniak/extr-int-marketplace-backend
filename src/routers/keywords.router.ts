import Router from "express-promise-router";
import {
  KeywordsController,
} from '../controllers/keywords.controller';

const router = Router();

router.get('/', KeywordsController.findKeywords);
router.post('/', KeywordsController.createKeyword);
router.get('/:id', KeywordsController.findKeywordById);
router.patch('/:id', KeywordsController.updateKeyword);
router.delete('/:id', KeywordsController.deleteKeyword);

export default router;
