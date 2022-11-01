import Router from "express-promise-router";
import {
  addAttributeToProductController,
  findAttributeToProductByIdController,
  removeAttributeFromProductController
} from "../controllers/attributeToProduct";
const router = Router();

router.get('/:id', findAttributeToProductByIdController)
router.post('/', addAttributeToProductController);
router.delete('/', removeAttributeFromProductController);

export default router;
