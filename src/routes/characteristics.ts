
import {
  deleteCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  patchCharacteristic,
  postCharacteristic
} from "../controllers/characteristics";

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCharacteristics);
router.get('/:id', getCharacteristicById);
router.post('/', postCharacteristic);
router.patch('/:id', patchCharacteristic);
router.delete('/:id', deleteCharacteristic);

export default router;
