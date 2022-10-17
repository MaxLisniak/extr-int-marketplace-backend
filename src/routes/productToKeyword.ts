import Router from "express-promise-router";
import {
  addKeywordToProductController,
  findProductToKeywordByIdController,
  findProductToKeywordsController,
  removeKeywordFromProductController
} from "../controllers/productToKeyword";
const router = Router();

router.get('/:id', findProductToKeywordByIdController)
router.get('/', findProductToKeywordsController)
router.post('/', addKeywordToProductController);
router.delete('/', removeKeywordFromProductController);

export default router;
