import { Request, Response } from "express";
import {
  productCreatePayloadSchema,
  productUpdatePayloadSchema,
  productFindOnePayloadSchema,
  filterPayloadSchema,
} from "../validationSchemas/product";
import {
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductsByFilters,
} from "../services/products";
import { idSchema } from "../validationSchemas/id";

// export async function findProductsController(req: Request, res: Response): Promise<void> { 
//   const payload = productFindPayloadSchema
//     .validateSync(req.query, { stripUnknown: true })
//   const products = await findProducts(payload)
//   if (products.length === 0) throw new Error("Nothing found") 
//   res.json({ data: products });
// }

export async function findProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = productFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const product = await findProductById(payload.id)
  res.json({ data: product });
}

export async function findProductsByFiltersController(req: Request, res: Response): Promise<void> {
  const payload = filterPayloadSchema.validateSync({ ...req.body, ...req.query })
  const { products, total } = await findProductsByFilters(payload);
  res.json({ data: products, total: total[0] })
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
