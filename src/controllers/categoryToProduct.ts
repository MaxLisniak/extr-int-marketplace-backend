import { Request, Response } from "express";
import {
  addCategoryToProductPayloadSchema,
  removeCategoryFromProductPayloadSchema,
  categoryToProductFindOnePayloadSchema,
} from "../validationSchemas/categoryToProduct";
import {
  addCategoryToProduct,
  findCategoryToProductById,
  removeCategoryFromProduct
} from "../services/categoryToProduct";

export async function addCategoryToProductController(req: Request, res: Response): Promise<void> {
  const payload = await addCategoryToProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await addCategoryToProduct(payload)
  res.sendStatus(200);
}

export async function removeCategoryFromProductController(req: Request, res: Response): Promise<void> {
  const payload = await removeCategoryFromProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await removeCategoryFromProduct(payload)
  res.sendStatus(200);
}

export async function findCategoryToProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = categoryToProductFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const categoryToProduct = await findCategoryToProductById(payload.id)
  res.json({ data: categoryToProduct })
}