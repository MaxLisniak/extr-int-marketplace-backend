
import Router from "express-promise-router";
import {
  findAttributeValuesController,
  findAttributeValueByIdController,
  createAttributeValueController,
  updateAttributeValueController,
  deleteAttributeValueController,
} from "../controllers/attributeValues";

const router = Router();

router.get('/', findAttributeValuesController);
router.post('/', createAttributeValueController);
router.get('/:id', findAttributeValueByIdController);
router.patch('/:id', updateAttributeValueController);
router.delete('/:id', deleteAttributeValueController);

export default router;
