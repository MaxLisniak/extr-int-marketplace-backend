import { Request, Response, NextFunction } from 'express';
import { deleteCategory, getCategories, getSingleCategory, patchCategory, postCategory } from '../services/categories';
import { categorySchema } from "../validationSchemas/category";

export async function getCategoriesController(req: Request, res: Response): Promise<void> {
  const { nested } = req.query;
  const categories = await getCategories(
    nested === "true"
  )
  res.json({ data: categories });
}

export async function getCategoryByIdController(req: Request, res: Response): Promise<void> {
  const paramsPayload = categorySchema.validateSync(req.params);
  const { nested } = req.query;
  const category = await getSingleCategory(
    paramsPayload.id,
    nested === "true"
  )
  res.json({ data: category });
}

export async function postCategoryController(req: Request, res: Response): Promise<void> {
  const bodyPayload = categorySchema.validateSync(req.body)
  const category = await postCategory(bodyPayload)
  res.json({ data: category });
}

export async function patchCategoryController(req: Request, res: Response): Promise<void> {
  const bodyPayload = categorySchema.validateSync(req.body)
  const paramsPayload = categorySchema.validateSync(req.params)
  const category = await patchCategory(
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