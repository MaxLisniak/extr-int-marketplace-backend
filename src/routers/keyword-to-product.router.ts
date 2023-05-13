import Router from "express-promise-router";
import { KeywordToProductController } from "../controllers/keyword-to-product.controller";
const router = Router();

router.get('/:id', KeywordToProductController.findKeywordToProductById)
router.post('/', KeywordToProductController.addKeywordToProduct);
router.delete('/', KeywordToProductController.removeKeywordFromProduct);

export default router;
