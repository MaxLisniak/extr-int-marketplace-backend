
import {
  deleteCharacteristicNameController,
  getCharacteristicNamesController,
  getCharacteristicNameByIdController,
  patchCharacteristicNameController,
  postCharacteristicNameController
} from '../controllers/characteristicNames';

import Router from "express-promise-router";
const router = Router();

router.get('/', getCharacteristicNamesController)
router.post('/', postCharacteristicNameController);
router.get('/:id', getCharacteristicNameByIdController);
router.patch('/:id', patchCharacteristicNameController);
router.delete('/:id', deleteCharacteristicNameController);

export default router;
