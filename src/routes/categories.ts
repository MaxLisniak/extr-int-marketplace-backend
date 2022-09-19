

import {
  deleteCategory,
  getAllCategories,
  getAllCategoriesExtended,
  getCategoryById,
  patchCategory,
  postCategory
} from '../controllers/categories';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCategories);
router.get('/extended/', getAllCategoriesExtended);
router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.patch('/:id', patchCategory);
router.delete('/:id', deleteCategory);

export default router;
