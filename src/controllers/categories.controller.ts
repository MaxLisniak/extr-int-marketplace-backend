import { Request, Response } from 'express';
import { categorySchema } from '../lib/interfaces/categorySchema';
import { CategoriesValidationSchemas } from '../validation-schemas/categories.validation';
import { CategoriesService } from '../services/categories.service';


async function findCategoriesNested(req: Request, res: Response): Promise<void> {
  const categories = await CategoriesService.findCategoriesNested()
  console.log(categories)
  const nest = (items: categorySchema[], id: number | null = null): categorySchema[] =>
    items
      .filter(item => item.parent_id === id)
      .map(item => ({ ...item, subcategories: nest(items, item.id) }));
  res.json({ data: nest(categories) });
}

async function findCategoryById(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.categoryFindOnePayload
    .validate(req.params, { stripUnknown: true });
  const category = await CategoriesService.findCategoryById(payload.id)
  res.json({ data: category });
}

async function createCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.categoryCreatePayload
    .validate(req.body, { stripUnknown: true })
  const category = await CategoriesService.createCategory(payload)
  res.json({ data: category });
}

async function updateCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.categoryUpdatePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const category = await CategoriesService.updateCategory(payload.id, payload)
  res.json({ data: category });
}

async function deleteCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.categoryDeletePayload
    .validate(req.params, { stripUnknown: true })
  await CategoriesService.deleteCategory(payload.id)
  res.sendStatus(200);
}

export const CategoriesController = {
  findCategoriesNested,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}