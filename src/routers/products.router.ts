import Router from "express-promise-router";
import { ProductsController } from "../controllers/products.controller";

const router = Router();

router.post('/filter', ProductsController.findProductsByFilters);
router.get('/:id', ProductsController.findProductById);
router.post('/', ProductsController.createProduct);
router.patch('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

export default router;
