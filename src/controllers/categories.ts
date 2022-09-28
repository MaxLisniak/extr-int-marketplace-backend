import { Request, Response } from 'express';
import {
  categoryCreatePayloadSchema,
  categoryUpdatePayloadSchema,
  categoryFindPayloadSchema,
  categoryFindOnePayloadSchema,
} from "../validationSchemas/category";
import { idSchema } from '../validationSchemas/id';
import {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories';

export async function findCategoriesController(req: Request, res: Response): Promise<void> {
  const payload = categoryFindPayloadSchema.validateSync(req.query, { stripUnknown: true })
  const categories = await findCategories(payload)
  res.json({ data: categories });
}

export async function findCategoryByIdController(req: Request, res: Response): Promise<void> {
  const payload = categoryFindOnePayloadSchema.validateSync({ ...req.params, ...req.query }, { stripUnknown: true });
  const category = await findCategoryById(payload)
  res.json({ data: category });
}

export async function createCategoryController(req: Request, res: Response): Promise<void> {
  const payload = categoryCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const category = await createCategory(payload)
  res.json({ data: category });
}

export async function updateCategoryController(req: Request, res: Response): Promise<void> {
  const payload = categoryUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const category = await updateCategory(payload)
  res.json({ data: category });
}

export async function deleteCategoryController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteCategory(payload.id)
  res.sendStatus(200);
}