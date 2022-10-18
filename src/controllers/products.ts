import { Request, Response } from "express";
import {
  productCreatePayloadSchema,
  productUpdatePayloadSchema,
  productFindPayloadSchema,
  productFindOnePayloadSchema,
  filterPayloadSchema,
} from "../validationSchemas/product";
import {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductsByFilters,
} from "../services/products";
import { idSchema } from "../validationSchemas/id";

export async function findProductsController(req: Request, res: Response): Promise<void> { // TODO: зачем тебе эта функция - у тебя есть findProductsByFiltersController
  const payload = productFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const products = await findProducts(payload)
  if (products.length === 0) throw new Error("Nothing found") // TODO: не выбрасывай ошибку, лучше верни пустой массив
  res.json({ data: products });
}

export async function findProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = productFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const product = await findProductById(payload.id)
  res.json({ data: product });
}

export async function findProductsByFiltersController(req: Request, res: Response): Promise<void> {
  const payload = filterPayloadSchema.validateSync({ ...req.body, ...req.query })
  const products = await findProductsByFilters(payload);
  res.json({ data: products })
}

export async function createProductController(req: Request, res: Response): Promise<void> {
  const payload = productCreatePayloadSchema
    .validateSync({ ...req.body }, { stripUnknown: true })
  const product = await createProduct(payload)
  res.json({ data: product });
}

export async function updateProductController(req: Request, res: Response): Promise<void> {
  const payload = productUpdatePayloadSchema
    .validateSync({ ...req.params, ...req.body }, { stripUnknown: true })
  const product = await updateProduct(payload.id, payload)
  res.json({ data: product })
}

export async function deleteProductController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteProduct(payload.id)
  res.sendStatus(200);
}
