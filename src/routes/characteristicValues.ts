
import {
  findCharacteristicValuesController,
  findCharacteristicValueByIdController,
  createCharacteristicValueController,
  updateCharacteristicValueController,
  deleteCharacteristicValueController,
} from "../controllers/characteristicValues";

import Router from "express-promise-router";
const router = Router();

router.get('/', findCharacteristicValuesController);
router.post('/', createCharacteristicValueController);
router.get('/:id', findCharacteristicValueByIdController);
router.patch('/:id', updateCharacteristicValueController);
router.delete('/:id', deleteCharacteristicValueController);

export default router;
