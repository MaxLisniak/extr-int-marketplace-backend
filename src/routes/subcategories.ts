
import {
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryByCategoryId,
  getSubcategoryById,
  patchSubcategory,
  postSubcategory,
} from '../controllers/subcategories';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllSubcategories);
router.get('/:id', getSubcategoryById);
router.get('/by-category-id/:id', getSubcategoryByCategoryId);
router.post('/', postSubcategory);
router.patch('/:id', patchSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
