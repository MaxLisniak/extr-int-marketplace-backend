import Router from "express-promise-router";
import {
  addCategoryToProductController,
  findCategoryToProductByIdController,
  removeCategoryFromProductController
} from "../controllers/categoryToProduct";
const router = Router();

router.get('/:id', findCategoryToProductByIdController)
router.post('/', addCategoryToProductController);
router.delete('/', removeCategoryFromProductController);

export default router;
