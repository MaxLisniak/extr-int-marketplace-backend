import express from 'express';
import {
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryByCategoryId,
  getSubcategoryById,
  patchSubcategory,
  postSubcategory,
} from '../controllers/subcategories';

const router = express.Router();

router.get('/', getAllSubcategories);
router.get('/:id', getSubcategoryById);
router.get('/by-category-id/:id', getSubcategoryByCategoryId);
router.post('/', postSubcategory);
router.patch('/:id', patchSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
