import { Request, Response } from "express";
import {
  productCreatePayloadSchema,
  productUpdatePayloadSchema,
  productFindOnePayloadSchema,
  filterPayloadSchema,
  productDeletePayloadSchema,
} from "../validationSchemas/product";
import {
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductsByFilters,
} from "../services/products";


export async function findProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = productFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const product = await findProductById(payload.id)
  res.json({ data: product });
}

export async function findProductsByFiltersController(req: Request, res: Response): Promise<void> {
  const payload = filterPayloadSchema.validateSync({ ...req.body })
  const [products, total] = await findProductsByFilters(payload);
  res.json({ data: products, total: total[0] })
}

export async function createProductController(req: Request, res: Response): Promise<void> {
  const payload = await productCreatePayloadSchema
    .validate({ ...req.body }, { stripUnknown: true })
  const product = await createProduct(payload)
  res.json({ data: product });
}

export async function updateProductController(req: Request, res: Response): Promise<void> {
  const payload = await productUpdatePayloadSchema
    .validate({ ...req.params, ...req.body }, { stripUnknown: true })
  const product = await updateProduct(payload.id, payload)
  res.json({ data: product })
}

export async function deleteProductController(req: Request, res: Response): Promise<void> {
  const payload = await productDeletePayloadSchema
    .validate(req.params, { stripUnknown: true })
  await deleteProduct(payload.id)
  res.sendStatus(200);
}
