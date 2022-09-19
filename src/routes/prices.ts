
import {
  deletePrice,
  getAllPrices,
  getPriceById,
  patchPrice,
  postPrice
} from '../controllers/prices';

import Router from "express-promise-router";
const router = Router();

router.get('/', getAllPrices);
router.get('/:id', getPriceById);
router.post('/', postPrice);
router.patch('/:id', patchPrice);
router.delete('/:id', deletePrice);

export default router;
