import Router from "express-promise-router";
import { CategoriesController } from "../controllers/categories.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";


const router = Router();

router.get('/:id', CategoriesController.findById);
router.get('/', CategoriesController.findRootCategories)

router.post('/:category_id/products/:product_id',
  [verifyAuthorization, verifyAdmin, CategoriesController.addProduct]);
router.post('/', [verifyAuthorization, verifyAdmin, CategoriesController.create]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, CategoriesController.updateById]);

router.delete('/:category_id/products/:product_id',
  [verifyAuthorization, verifyAdmin, CategoriesController.removeProduct]);
router.delete('/:id', [verifyAuthorization, verifyAdmin, CategoriesController.deleteById]);


export default router;
