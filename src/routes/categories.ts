

import {
  deleteCategory,
  getAllCategories,
  // getAllCategoriesRecursively,
  getCategoryById,
  patchCategory,
  postCategory
} from '../controllers/categories';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCategories);
// router.get('/recursively/', getAllCategoriesRecursively);
router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.patch('/:id', patchCategory);
router.delete('/:id', deleteCategory);

export default router;
