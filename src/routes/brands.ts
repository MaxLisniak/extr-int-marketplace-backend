
import Router from "express-promise-router";
import {
  findBrandsController,
  findBrandByIdController,
  createBrandController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brands";

const router = Router();

router.get('/', findBrandsController);
router.post('/', createBrandController);
router.get('/:id', findBrandByIdController);
router.patch('/:id', updateBrandController);
router.delete('/:id', deleteBrandController);

export default router;
