
import Router from "express-promise-router";
import { BrandsController } from "../controllers/brands.controller";


const router = Router();

router.get('/', BrandsController.findBrands);
router.post('/', BrandsController.createBrand);
router.get('/:id', BrandsController.findBrandById);
router.patch('/:id', BrandsController.updateBrand);
router.delete('/:id', BrandsController.deleteBrand);

export default router;
