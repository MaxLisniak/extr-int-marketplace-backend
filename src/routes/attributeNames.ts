import Router from "express-promise-router";
import {
  findAttributeNamesController,
  findAttributeNameByIdController,
  createAttributeNameController,
  updateAttributeNameController,
  deleteAttributeNameController,
} from '../controllers/attributeNames';

const router = Router();

router.get('/', findAttributeNamesController)
router.post('/', createAttributeNameController);
router.get('/:id', findAttributeNameByIdController);
router.patch('/:id', updateAttributeNameController);
router.delete('/:id', deleteAttributeNameController);

export default router;
