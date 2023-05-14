import Router from "express-promise-router";
import { CategoriesController } from "../controllers/categories.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";


const router = Router();

router.get('/:id', CategoriesController.findCategoryById);
router.get('/', CategoriesController.findCategoriesNested)

router.post('/', [verifyAuthorization, verifyAdmin, CategoriesController.createCategory]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, CategoriesController.updateCategory]);

router.delete('/:id', [verifyAuthorization, verifyAdmin, CategoriesController.deleteCategory]);

export default router;
