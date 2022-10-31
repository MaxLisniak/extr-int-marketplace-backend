import { Request, Response } from "express";
import {
  productToKeywordFindOnePayloadSchema,
  addKeywordToProductPayloadSchema,
  removeKeywordFromProductPayloadSchema
} from "../validationSchemas/productToKeyword";
import {
  addKeywordToProduct,
  findProductToKeywordById,
  removeKeywordFromProduct
} from "../services/productToKeyword";

export async function addKeywordToProductController(req: Request, res: Response): Promise<void> {
  const payload = await addKeywordToProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await addKeywordToProduct(payload)
  res.sendStatus(200);
}

export async function removeKeywordFromProductController(req: Request, res: Response): Promise<void> {
  const payload = await removeKeywordFromProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await removeKeywordFromProduct(payload)
  res.sendStatus(200);
}

export async function findProductToKeywordByIdController(req: Request, res: Response): Promise<void> {
  const payload = productToKeywordFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const productToKeyword = await findProductToKeywordById(payload.id)
  res.json({ data: productToKeyword });
}
