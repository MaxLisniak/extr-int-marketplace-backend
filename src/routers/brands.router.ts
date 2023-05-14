
import Router from "express-promise-router";
import { BrandsController } from "../controllers/brands.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";


const router = Router();

router.get('/:id', BrandsController.findBrandById);
router.get('/', BrandsController.findBrands);

router.post('/', [verifyAuthorization, verifyAdmin, BrandsController.createBrand]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, BrandsController.updateBrand]);

router.delete('/:id', [verifyAuthorization, verifyAdmin, BrandsController.deleteBrand]);

export default router;
