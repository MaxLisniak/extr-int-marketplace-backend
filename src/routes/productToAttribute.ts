import Router from "express-promise-router";
import {
  addAttributeToProductController,
  findProductToAttributeByIdController,
  removeAttributeFromProductController
} from "../controllers/productToAttribute";
const router = Router();

router.get('/:id', findProductToAttributeByIdController)
router.post('/', addAttributeToProductController);
router.delete('/', removeAttributeFromProductController);

export default router;
