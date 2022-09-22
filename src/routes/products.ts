
import {
  deleteProductController,
  getProductsController,
  getProductByIdController,
  patchProductController,
  postProductController
} from '../controllers/products';

import Router from "express-promise-router";
const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', postProductController);
router.patch('/:id', patchProductController);
router.delete('/:id', deleteProductController);

export default router;
