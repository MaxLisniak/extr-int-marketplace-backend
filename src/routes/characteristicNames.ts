import Router from "express-promise-router";
import {
  findCharacteristicNamesController,
  findCharacteristicNameByIdController,
  createCharacteristicNameController,
  updateCharacteristicNameController,
  deleteCharacteristicNameController,
} from '../controllers/characteristicNames';

const router = Router();

router.get('/', findCharacteristicNamesController)
router.post('/', createCharacteristicNameController);
router.get('/:id', findCharacteristicNameByIdController);
router.patch('/:id', updateCharacteristicNameController);
router.delete('/:id', deleteCharacteristicNameController);

export default router;
