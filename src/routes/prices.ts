import express from 'express';
import {
  deletePrice,
  getAllPrices,
  getPriceById,
  patchPrice,
  postPrice
} from '../controllers/prices';

const router = express.Router();

router.get('/', getAllPrices);
router.get('/:id', getPriceById);
router.post('/', postPrice);
router.patch('/:id', patchPrice);
router.delete('/:id', deletePrice);

export default router;
