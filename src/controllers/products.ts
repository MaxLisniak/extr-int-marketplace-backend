import { Request, Response } from "express";
import { productSchema } from "../validationSchemas/product";
import {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

export async function findProductsController(req: Request, res: Response): Promise<void> {
  const {
    category_id,
    search_query,
    include_comments,
    include_characteristics
  } = req.query;

  const products = await findProducts(
    Number(category_id),
    !search_query ? undefined : String(search_query),
    include_comments === "true",
    include_characteristics === "true"
  )
  res.json({ data: products });
}

export async function findProductByIdController(req: Request, res: Response): Promise<void> {
  const {
    include_comments,
    include_characteristics
  } = req.query;

  const paramsPayload = productSchema.validateSync(req.params)
  const product = await findProductById(
    paramsPayload.id,
    include_comments === "true",
    include_characteristics === "true"
  )
  res.json({ data: product });
}

export async function createProductController(req: Request, res: Response): Promise<void> {
  const bodyPayload = productSchema.validateSync(req.body)
  const product = await createProduct(bodyPayload)
  res.json({ data: product });
}

export async function updateProductController(req: Request, res: Response): Promise<void> {
  const bodyPayload = productSchema.validateSync(req.body)
  const paramsPayload = productSchema.validateSync(req.params)
  const product = await updateProduct(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: product })
}

export async function deleteProductController(req: Request, res: Response): Promise<void> {
  const paramsPayload = productSchema.validateSync(req.params)
  await deleteProduct(paramsPayload.id)
  res.sendStatus(200);
}
