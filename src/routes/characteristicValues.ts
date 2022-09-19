
import {
  deleteCharacteristicValue,
  getAllCharacteristicValues,
  getCharacteristicValueById,
  patchCharacteristicValue,
  postCharacteristicValue
} from "../controllers/characteristicValues";

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCharacteristicValues);
router.get('/:id', getCharacteristicValueById);
router.post('/', postCharacteristicValue);
router.patch('/:id', patchCharacteristicValue);
router.delete('/:id', deleteCharacteristicValue);

export default router;
