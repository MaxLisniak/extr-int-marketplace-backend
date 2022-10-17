import Router from "express-promise-router";
import {
  addAttributeToProductController,
  findProductToAttributeByIdController,
  findProductToAttributesController,
  removeAttributeFromProductController
} from "../controllers/productToAttribute";
const router = Router();

router.get('/:id', findProductToAttributeByIdController)
router.get('/', findProductToAttributesController)
router.post('/', addAttributeToProductController);
router.delete('/', removeAttributeFromProductController);

export default router;
