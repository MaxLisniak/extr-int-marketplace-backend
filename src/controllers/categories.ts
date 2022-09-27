import { Request, Response } from 'express';
import { categorySchema } from "../validationSchemas/category";
import {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories';

export async function findCategoriesController(req: Request, res: Response): Promise<void> {
  const { nested } = req.query;
  const categories = await findCategories(
    nested === "true"
  )
  res.json({ data: categories });
}

export async function findCategoryByIdController(req: Request, res: Response): Promise<void> {
  const paramsPayload = categorySchema.validateSync(req.params);
  const { nested } = req.query;
  const category = await findCategoryById(
    paramsPayload.id,
    nested === "true"
  )
  res.json({ data: category });
}

export async function createCategoryController(req: Request, res: Response): Promise<void> {
  const bodyPayload = categorySchema.validateSync(req.body)
  const category = await createCategory(bodyPayload)
  res.json({ data: category });
}

export async function updateCategoryController(req: Request, res: Response): Promise<void> {
  const bodyPayload = categorySchema.validateSync(req.body)
  const paramsPayload = categorySchema.validateSync(req.params)
  const category = await updateCategory(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: category });
}

export async function deleteCategoryController(req: Request, res: Response): Promise<void> {
  const paramsPayload = categorySchema.validateSync(req.params)
  await deleteCategory(paramsPayload.id)
  res.sendStatus(200);
}