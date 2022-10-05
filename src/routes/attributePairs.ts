import Router from "express-promise-router";
import {
  findAttributePairsController,
  findAttributePairByIdController,
  createAttributePairController,
  updateAttributePairController,
  deleteAttributePairController,
} from '../controllers/AttributePairs';

const router = Router();

router.get('/', findAttributePairsController)
router.post('/', createAttributePairController);
router.get('/:id', findAttributePairByIdController);
router.patch('/:id', updateAttributePairController);
router.delete('/:id', deleteAttributePairController);

export default router;
