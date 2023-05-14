import Router from "express-promise-router";
import {
  KeywordsController,
} from '../controllers/keywords.controller';
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";

const router = Router();

router.get('/:id', KeywordsController.findById);
router.get('/', KeywordsController.find);

router.post('/:keyword_id/products/:product_id',
  [verifyAuthorization, verifyAdmin, KeywordsController.addToProduct]);
router.post('/', KeywordsController.create);

router.patch('/:id', [verifyAuthorization, verifyAdmin, KeywordsController.updateById]);

router.delete('/:keyword_id/products/:product_id', [
  verifyAuthorization, verifyAdmin, KeywordsController.removeFromProduct]);
router.delete('/:id', [verifyAuthorization, verifyAdmin, KeywordsController.deleteById]);


export default router;
