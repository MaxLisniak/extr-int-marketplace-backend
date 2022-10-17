import { Request, Response } from "express";
import {
  productToCategoryFindOnePayloadSchema,
  productToCategoryPayloadSchema
} from "../validationSchemas/productToCategory";
import {
  addCategoryToProduct,
  findProductToCategories,
  findProductToCategoryById,
  removeCategoryFromProduct
} from "../services/productToCategory";

export async function addCategoryToProductController(req: Request, res: Response): Promise<void> {
  const payload = productToCategoryPayloadSchema.validateSync(req.body, { stripUnknown: true })
  await addCategoryToProduct(payload)
  res.sendStatus(200);
}

export async function removeCategoryFromProductController(req: Request, res: Response): Promise<void> {
  const payload = productToCategoryPayloadSchema.validateSync(req.body, { stripUnknown: true })
  await removeCategoryFromProduct(payload)
  res.sendStatus(200);
}

export async function findProductToCategoriesController(req: Request, res: Response): Promise<void> {
  const productToCategories = await findProductToCategories()
  res.json({ data: productToCategories });
}

export async function findProductToCategoryByIdController(req: Request, res: Response): Promise<void> {
  const payload = productToCategoryFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const productToCategory = await findProductToCategoryById(payload.id)
  res.json({ data: productToCategory })
}