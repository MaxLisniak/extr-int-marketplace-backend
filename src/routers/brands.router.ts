
import Router from "express-promise-router";
import { BrandsController } from "../controllers/brands.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";


const router = Router();

router.get('/:id', BrandsController.findById);
router.get('/', BrandsController.find);

router.post('/', [verifyAuthorization, verifyAdmin, BrandsController.create]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, BrandsController.updateById]);

router.delete('/:id', [verifyAuthorization, verifyAdmin, BrandsController.deleteById]);

export default router;
