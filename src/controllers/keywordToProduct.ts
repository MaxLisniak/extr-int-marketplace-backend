import { Request, Response } from "express";
import {
  keywordToProductFindOnePayloadSchema,
  addKeywordToProductPayloadSchema,
  removeKeywordFromProductPayloadSchema
} from "../validationSchemas/keywordToProduct";
import {
  addKeywordToProduct,
  findKeywordToProductById,
  removeKeywordFromProduct
} from "../services/keywordToProduct";

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

export async function findKeywordToProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = keywordToProductFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const keywordToProduct = await findKeywordToProductById(payload.id)
  res.json({ data: keywordToProduct });
}
