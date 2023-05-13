import Router from "express-promise-router";
import { CategoryToProductController } from "../controllers/category-to-product.controller";

const router = Router();

router.get('/:id', CategoryToProductController.findCategoryToProductById)
router.post('/', CategoryToProductController.addCategoryToProduct);
router.delete('/', CategoryToProductController.removeCategoryFromProduct);

export default router;
