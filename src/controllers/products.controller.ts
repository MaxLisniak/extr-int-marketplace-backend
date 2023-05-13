import { Request, Response } from "express";
import { ProductsValidationSchemas } from "../validation-schemas/products.validation";
import { ProductsService } from "../services/products.service";


async function findProductById(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.productFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const product = await ProductsService.findProductById(payload.id)
  res.json({ data: product });
}

async function findProductsByFilters(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.filterPayload.validate({ ...req.body })
  const [products, total] = await ProductsService.findProductsByFilters(payload);
  res.json({ data: products, total: total[0] })
}

async function createProduct(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.productCreatePayload
    .validate({ ...req.body }, { stripUnknown: true })
  const product = await ProductsService.createProduct(payload)
  res.json({ data: product });
}

async function updateProduct(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.productUpdatePayload
    .validate({ ...req.params, ...req.body }, { stripUnknown: true })
  const product = await ProductsService.updateProduct(payload.id, payload)
  res.json({ data: product })
}

async function deleteProduct(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.productDeletePayload
    .validate(req.params, { stripUnknown: true })
  await ProductsService.deleteProduct(payload.id)
  res.sendStatus(200);
}

export const ProductsController = {
  findProductById,
  findProductsByFilters,
  createProduct,
  updateProduct,
  deleteProduct,
}