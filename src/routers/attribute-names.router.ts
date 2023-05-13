import Router from "express-promise-router";
import { AttributeNamesController } from "../controllers/attribute-names.controller";

const router = Router();

router.get('/', AttributeNamesController.findAttributeNames)
router.post('/', AttributeNamesController.createAttributeName);
router.get('/:id', AttributeNamesController.findAttributeNameById);
router.patch('/:id', AttributeNamesController.updateAttributeName);
router.delete('/:id', AttributeNamesController.deleteAttributeName);

export default router;
