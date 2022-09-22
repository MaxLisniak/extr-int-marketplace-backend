import { Request, Response, NextFunction } from "express";
import { productSchema } from "../validationSchemas/product";
import { deleteProduct, getProductById, getProducts, patchProduct, postProduct } from "../services/products";

export async function getProductsController(req: Request, res: Response): Promise<void> {
  const {
    category_id,
    search_query,
    include_comments,
    include_characteristics
  } = req.query;

  const products = await getProducts(
    Number(category_id),
    !search_query ? undefined : String(search_query),
    include_comments === "true",
    include_characteristics === "true"
  )
  res.json({ data: products });
}

export async function getProductByIdController(req: Request, res: Response): Promise<void> {
  const {
    include_comments,
    include_characteristics
  } = req.query;

  const paramsPayload = productSchema.validateSync(req.params)
  const product = await getProductById(
    paramsPayload.id,
    include_comments === "true",
    include_characteristics === "true"
  )
  res.json({ data: product });
}

export async function postProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = productSchema.validateSync(req.body)
  const product = await postProduct(bodyPayload)
  res.json({ data: product });
}

export async function patchProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = productSchema.validateSync(req.body)
  const paramsPayload = productSchema.validateSync(req.params)
  const product = await patchProduct(
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
