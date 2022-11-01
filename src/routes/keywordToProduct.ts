import Router from "express-promise-router";
import {
  addKeywordToProductController,
  findKeywordToProductByIdController,
  removeKeywordFromProductController
} from "../controllers/keywordToProduct";
const router = Router();

router.get('/:id', findKeywordToProductByIdController)
router.post('/', addKeywordToProductController);
router.delete('/', removeKeywordFromProductController);

export default router;
