import Router from "express-promise-router";
import {
  addKeywordToProductController,
  findProductToKeywordByIdController,
  removeKeywordFromProductController
} from "../controllers/productToKeyword";
const router = Router();

router.get('/:id', findProductToKeywordByIdController)
router.post('/', addKeywordToProductController);
router.delete('/', removeKeywordFromProductController);

export default router;
