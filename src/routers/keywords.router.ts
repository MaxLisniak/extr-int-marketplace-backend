import Router from "express-promise-router";
import {
  KeywordsController,
} from '../controllers/keywords.controller';

const router = Router();

router.get('/:id', KeywordsController.findById);
router.get('/', KeywordsController.find);
router.patch('/:id', KeywordsController.updateById);
router.post('/:keyword_id/:product_id', KeywordsController.addToProduct);
router.post('/', KeywordsController.create);
router.delete('/:keyword_id/:product_id', KeywordsController.removeFromProduct);
router.delete('/:id', KeywordsController.deleteById);


export default router;
