import { Request, Response } from "express";
import {
  productToKeywordFindOnePayloadSchema,
  productToKeywordPayloadSchema
} from "../validationSchemas/productToKeyword";
import {
  addKeywordToProduct,
  findProductToKeywords,
  findProductToKeywordById,
  removeKeywordFromProduct
} from "../services/productToKeyword";

export async function addKeywordToProductController(req: Request, res: Response): Promise<void> {
  const payload = productToKeywordPayloadSchema.validateSync(req.body, { stripUnknown: true })
  await addKeywordToProduct(payload)
  res.sendStatus(200);
}

export async function removeKeywordFromProductController(req: Request, res: Response): Promise<void> {
  const payload = productToKeywordPayloadSchema.validateSync(req.body, { stripUnknown: true })
  await removeKeywordFromProduct(payload)
  res.sendStatus(200);
}

export async function findProductToKeywordsController(req: Request, res: Response): Promise<void> {
  const productToKeywords = await findProductToKeywords()
  res.json({ data: productToKeywords });
}

export async function findProductToKeywordByIdController(req: Request, res: Response): Promise<void> {
  const payload = productToKeywordFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const productToKeyword = await findProductToKeywordById(payload.id)
  res.json({ data: productToKeyword });
}
