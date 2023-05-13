import { Request, Response } from "express";
import { KeywordToProductService } from "../services/keyword-to-product.service";
import { KeywordToProductValidationSchemas } from "../validation-schemas/keyword-to-product.validation";


async function addKeywordToProduct(req: Request, res: Response): Promise<void> {
  const payload = await KeywordToProductValidationSchemas.addKeywordToProductPayload
    .validate(req.body, { stripUnknown: true })
  await KeywordToProductService.addKeywordToProduct(payload)
  res.sendStatus(200);
}

async function removeKeywordFromProduct(req: Request, res: Response): Promise<void> {
  const payload = await KeywordToProductValidationSchemas.removeKeywordFromProductPayload
    .validate(req.body, { stripUnknown: true })
  await KeywordToProductService.removeKeywordFromProduct(payload)
  res.sendStatus(200);
}

async function findKeywordToProductById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordToProductValidationSchemas.keywordToProductFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const keywordToProduct = await KeywordToProductService.findKeywordToProductById(payload.id)
  res.json({ data: keywordToProduct });
}

export const KeywordToProductController = {
  addKeywordToProduct,
  removeKeywordFromProduct,
  findKeywordToProductById
}