import { Request, Response } from "express";
import {
  addCategoryToProductPayloadSchema,
  removeCategoryFromProductPayloadSchema,
  productToCategoryFindOnePayloadSchema,
} from "../validationSchemas/productToCategory";
import {
  addCategoryToProduct,
  findProductToCategoryById,
  removeCategoryFromProduct
} from "../services/productToCategory";

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

export async function findProductToCategoryByIdController(req: Request, res: Response): Promise<void> {
  const payload = productToCategoryFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const productToCategory = await findProductToCategoryById(payload.id)
  res.json({ data: productToCategory })
}