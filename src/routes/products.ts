
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  // getProductsByQuery,
  // getProductsParametrized,
  patchProduct,
  postProduct
} from '../controllers/products';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllProducts);
// router.get('/search', getProductsByQuery);
// router.get('/explore', getProductsParametrized);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', deleteProduct);

export default router;
