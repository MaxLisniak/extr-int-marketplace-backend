import Router from "express-promise-router";
import {
  findProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  findProductsByFiltersController,
} from '../controllers/products';

const router = Router();

router.get('/find-by-filters', findProductsByFiltersController);
router.get('/:id', findProductByIdController);
router.get('/', findProductsController);
router.post('/', createProductController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
