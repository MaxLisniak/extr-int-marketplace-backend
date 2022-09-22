import {
  deleteCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  patchCategoryController,
  postCategoryController
} from '../controllers/categories';

import Router from "express-promise-router";
const router = Router();

router.get('/', getCategoriesController);
router.get('/:id', getCategoryByIdController);
router.post('/', postCategoryController);
router.patch('/:id', patchCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
