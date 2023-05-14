
import Router from "express-promise-router";
import { AttributeValuesController } from "../controllers/attribute-values.controller";
import verifyAuthorization from "../middleware/verifyAuthorization";
import verifyAdmin from "../middleware/verifyAdmin";


const router = Router();

router.get('/:id', AttributeValuesController.findAttributeValueById);
router.get('/', AttributeValuesController.findAttributeValues);

router.post('/', [verifyAuthorization, verifyAdmin, AttributeValuesController.createAttributeValue]);

router.patch('/:id', [verifyAuthorization, verifyAdmin, AttributeValuesController.updateAttributeValue]);

router.delete('/:id', [verifyAuthorization, verifyAdmin, AttributeValuesController.deleteAttributeValue]);

export default router;
