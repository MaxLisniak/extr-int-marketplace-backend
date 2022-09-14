import express from 'express';
import {
  deleteCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  patchCharacteristic,
  postCharacteristic
} from "../controllers/characteristics";

const router = express.Router();

router.get('/', getAllCharacteristics);
router.get('/:id', getCharacteristicById);
router.post('/', postCharacteristic);
router.patch('/:id', patchCharacteristic);
router.delete('/:id', deleteCharacteristic);

export default router;
