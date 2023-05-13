import Router from "express-promise-router";
import { CategoriesController } from "../controllers/categories.controller";


const router = Router();

router.get('/', CategoriesController.findCategoriesNested)
router.post('/', CategoriesController.createCategory);
router.get('/:id', CategoriesController.findCategoryById);
router.patch('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

export default router;
