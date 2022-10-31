import Router from "express-promise-router";
import {
  addCategoryToProductController,
  findProductToCategoryByIdController,
  removeCategoryFromProductController
} from "../controllers/productToCategory";
const router = Router();

router.get('/:id', findProductToCategoryByIdController)
router.post('/', addCategoryToProductController);
router.delete('/', removeCategoryFromProductController);

export default router;
