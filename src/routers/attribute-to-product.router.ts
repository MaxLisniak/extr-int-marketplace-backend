import Router from "express-promise-router";
import { AttributeToProductController } from "../controllers/attribute-to-product.controller";

const router = Router();

router.get('/:id', AttributeToProductController.findAttributeToProductById)
router.post('/', AttributeToProductController.addAttributeToProduct);
router.delete('/', AttributeToProductController.removeAttributeFromProduct);

export default router;
