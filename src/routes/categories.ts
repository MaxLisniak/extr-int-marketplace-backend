import Router from "express-promise-router";
import {
  findCategoriesController,
  findCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  findCategoriesNestedController,
} from '../controllers/categories';

const router = Router();

router.get('/', findCategoriesController);
router.get('/nested', findCategoriesNestedController)
router.post('/', createCategoryController);
router.get('/:id', findCategoryByIdController);
router.patch('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
