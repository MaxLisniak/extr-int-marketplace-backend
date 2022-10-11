import Router from "express-promise-router";
import {
  findProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  addAttributeToProductController,
  removeAttributeToProductController,
  findProductsByFiltersController,
} from '../controllers/products';

const router = Router();

router.get('/', findProductsController);
router.post('/', createProductController);
router.post('/add-attribute', addAttributeToProductController);
router.post('/remove-attribute', removeAttributeToProductController);
router.get('/find-by-filters', findProductsByFiltersController);
router.get('/:id', findProductByIdController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
