import { Request, Response } from 'express';
import {
  categoryCreatePayloadSchema,
  categoryUpdatePayloadSchema,
  categoryFindOnePayloadSchema,
} from "../validationSchemas/category";
import { idSchema } from '../validationSchemas/id';
import {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoriesNested,
} from '../services/categories';
import { categorySchema } from '../interfaces/categorySchema';

export async function findCategoriesController(req: Request, res: Response): Promise<void> {
  const categories = await findCategories()
  res.json({ data: categories });
}

export async function findCategoriesNestedController(req: Request, res: Response): Promise<void> {
  const categories = await findCategoriesNested()
  console.log(categories)
  const nest = (items: categorySchema[], id: number | null = null): categorySchema[] =>
    items
      .filter(item => item.parent_id === id) // TODO: эта логика не будет работать - слишком много предположение - первый элемент массива должен быть единственной корневой категорией - тебе нужно на первой итерации получить список всех корневых категорий, и только после этого строить структуру для каждой из них отдельно
      .map(item => ({ ...item, subcategories: nest(items, item.id) }));
  res.json({ data: nest(categories) });
}

export async function findCategoryByIdController(req: Request, res: Response): Promise<void> {
  const payload = categoryFindOnePayloadSchema.validateSync(req.params, { stripUnknown: true });
  const category = await findCategoryById(payload.id)
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
  const category = await updateCategory(payload.id, payload)
  res.json({ data: category });
}

export async function deleteCategoryController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteCategory(payload.id)
  res.sendStatus(200);
}