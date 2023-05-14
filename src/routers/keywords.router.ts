import Router from "express-promise-router";
import {
  KeywordsController,
} from '../controllers/keywords.controller';

const router = Router();

router.get('/:id', KeywordsController.findById);
router.get('/', KeywordsController.find);
router.post('/', KeywordsController.create);
router.patch('/:id', KeywordsController.updateById);
router.delete('/:id', KeywordsController.deleteById);

export default router;
