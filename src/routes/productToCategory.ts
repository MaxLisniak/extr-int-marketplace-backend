import Router from "express-promise-router";
import {
  addCategoryToProductController,
  findProductToCategoriesController,
  findProductToCategoryByIdController,
  removeCategoryFromProductController
} from "../controllers/productToCategory";
const router = Router();

router.get('/:id', findProductToCategoryByIdController)
router.get('/', findProductToCategoriesController)
router.post('/', addCategoryToProductController);
router.delete('/', removeCategoryFromProductController);

export default router;