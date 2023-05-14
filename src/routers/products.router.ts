import Router from "express-promise-router";
import { ProductsController } from "../controllers/products.controller";

const router = Router();

router.get('/:id', ProductsController.findById);
router.post('/filter', ProductsController.findByFilters);
router.post('/', ProductsController.create);
router.patch('/:id', ProductsController.updateById);
router.delete('/:id', ProductsController.deleteById);

export default router;
