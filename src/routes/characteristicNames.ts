
import {
  deleteCharacteristicName,
  getAllCharacteristicNames,
  getCharacteristicNameById,
  // getCharacteristicsByCategoryId,
  patchCharacteristicName,
  postCharacteristicName
} from '../controllers/characteristicNames';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCharacteristicNames)
// router.get('/category-id/:id', getCharacteristicsByCategoryId);
router.get('/:id', getCharacteristicNameById);
router.post('/', postCharacteristicName);
router.patch('/:id', patchCharacteristicName);
router.delete('/:id', deleteCharacteristicName);

export default router;
