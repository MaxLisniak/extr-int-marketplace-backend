import express from 'express';
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  getProductsParametrized,
  patchProduct,
  postProduct
} from '../controllers/products';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', getProductsByQuery);
router.get('/explore', getProductsParametrized);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', deleteProduct);

export default router;
