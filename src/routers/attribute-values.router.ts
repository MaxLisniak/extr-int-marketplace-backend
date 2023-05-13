
import Router from "express-promise-router";
import { AttributeValuesController } from "../controllers/attribute-values.controller";


const router = Router();

router.get('/', AttributeValuesController.findAttributeValues);
router.post('/', AttributeValuesController.createAttributeValue);
router.get('/:id', AttributeValuesController.findAttributeValueById);
router.patch('/:id', AttributeValuesController.updateAttributeValue);
router.delete('/:id', AttributeValuesController.deleteAttributeValue);

export default router;
