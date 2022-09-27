
import {
  deleteCharacteristicValueController,
  getCharacteristicValuesController,
  getCharacteristicValueByIdController,
  patchCharacteristicValueController,
  postCharacteristicValueController
} from "../controllers/characteristicValues";

import Router from "express-promise-router";
const router = Router();

router.get('/', getCharacteristicValuesController);
router.post('/', postCharacteristicValueController);
router.get('/:id', getCharacteristicValueByIdController);
router.patch('/:id', patchCharacteristicValueController);
router.delete('/:id', deleteCharacteristicValueController);

export default router;
