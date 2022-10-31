import Router from "express-promise-router";
import {
  findCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  findCategoriesNestedController,
} from '../controllers/categories';

const router = Router();

router.get('/', findCategoriesNestedController)
router.post('/', createCategoryController);
router.get('/:id', findCategoryByIdController);
router.patch('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
