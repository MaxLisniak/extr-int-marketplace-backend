import Router from "express-promise-router";
import {
  findProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  findProductsByFiltersController,
} from '../controllers/products';

const router = Router();

router.post('/filter', findProductsByFiltersController);
router.get('/:id', findProductByIdController);
router.post('/', createProductController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
