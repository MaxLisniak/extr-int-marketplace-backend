import { Request, Response } from "express";
import { CategoryToProductValidationSchemas } from "../validation-schemas/category-to-product.validation";
import { CategoryToProductService } from "../services/category-to-product.service";


async function addCategoryToProduct(req: Request, res: Response): Promise<void> {
  const payload = await CategoryToProductValidationSchemas.addCategoryToProductPayload
    .validate(req.body, { stripUnknown: true })
  await CategoryToProductService.addCategoryToProduct(payload)
  res.sendStatus(200);
}

async function removeCategoryFromProduct(req: Request, res: Response): Promise<void> {
  const payload = await CategoryToProductValidationSchemas.removeCategoryFromProductPayload
    .validate(req.body, { stripUnknown: true })
  await CategoryToProductService.removeCategoryFromProduct(payload)
  res.sendStatus(200);
}

async function findCategoryToProductById(req: Request, res: Response): Promise<void> {
  const payload = await CategoryToProductValidationSchemas.categoryToProductFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const categoryToProduct = await CategoryToProductService.findCategoryToProductById(payload.id)
  res.json({ data: categoryToProduct })
}

export const CategoryToProductController = {
  addCategoryToProduct,
  removeCategoryFromProduct,
  findCategoryToProductById,
}