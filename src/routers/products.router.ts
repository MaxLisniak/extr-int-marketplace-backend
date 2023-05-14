import Router from "express-promise-router";
import { ProductsController } from "../controllers/products.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";

const router = Router();

router.get('/filter-list', ProductsController.getFilterList)
router.get('/:id', ProductsController.findById);

router.post('/filter', ProductsController.findByFilters);
router.post('/', [verifyAuthorization, verifyAdmin, ProductsController.create]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, ProductsController.updateById]);

router.delete('/:id', [verifyAuthorization, verifyAdmin, ProductsController.deleteById]);

router.post('/:product_id/attributes/',
  [verifyAuthorization, verifyAdmin, ProductsController.addAttribute])
router.delete('/:product_id/attributes/:attribute_id',
  [verifyAuthorization, verifyAdmin, ProductsController.removeAttribute])

export default router;
