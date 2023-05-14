import { Request, Response } from 'express';
import { categorySchema } from '../lib/interfaces/categorySchema';
import { CategoriesValidationSchemas } from '../validation-schemas/categories.validation';
import { CategoriesService } from '../services/categories.service';


async function findRootCategories(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.findPayload
    .validate(req.query, { stripUnknown: true });

  const categories = await CategoriesService.findRootCategories(payload)
  // const nest = (items: categorySchema[], id: number | null = null): categorySchema[] =>
  //   items
  //     .filter(item => item.parent_id === id)
  //     .map(item => ({ ...item, subcategories: nest(items, item.id) }));
  // res.json({ data: nest(categories) });
  res.json({ data: categories })
}

async function findCategoryById(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.findByIdPayload
    .validate(req.params, { stripUnknown: true });
  const category = await CategoriesService.findCategoryById(payload.id)
  res.json({ data: category });
}

async function createCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.createPayload
    .validate(req.body, { stripUnknown: true })
  const category = await CategoriesService.createCategory(payload)
  res.json({ data: category });
}

async function updateCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.updateByIdPayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const category = await CategoriesService.updateCategory(payload.id, payload)
  res.json({ data: category });
}

async function deleteCategory(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.deleteByIdPayload
    .validate(req.params, { stripUnknown: true })
  await CategoriesService.deleteCategory(payload.id)
  res.sendStatus(200);
}

async function addProduct(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.addProductPayload
    .validate(req.params, { stripUnknown: true })
  await CategoriesService.addProduct(payload)
  res.sendStatus(200);
}

async function removeProduct(req: Request, res: Response): Promise<void> {
  const payload = await CategoriesValidationSchemas.removeProductPayload
    .validate(req.params, { stripUnknown: true })
  await CategoriesService.removeProduct(payload)
  res.sendStatus(200);
}

export const CategoriesController = {
  findRootCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  removeProduct,
}