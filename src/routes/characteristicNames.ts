
import {
  deleteCharacteristicName,
  getAllCharacteristicNames,
  getCharacteristicNameById,
  getCharacteristicNamesBySubcategoryId,
  getCharacteristicNamesParametrized,
  patchCharacteristicName,
  postCharacteristicName
} from '../controllers/characteristicNames';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllCharacteristicNames)
router.get('/parameterized/', getCharacteristicNamesParametrized);
router.get('/by-subcategory-id/:id', getCharacteristicNamesBySubcategoryId);
router.get('/:id', getCharacteristicNameById);
router.post('/', postCharacteristicName);
router.patch('/:id', patchCharacteristicName);
router.delete('/:id', deleteCharacteristicName);

export default router;
