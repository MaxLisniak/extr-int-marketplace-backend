import Router from "express-promise-router";
import {
  findProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products';

const router = Router();

router.get('/', findProductsController);
router.post('/', createProductController);
router.get('/:id', findProductByIdController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
