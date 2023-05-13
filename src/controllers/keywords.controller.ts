import { Request, Response } from "express";
import { KeywordsValidationSchemas } from "../validation-schemas/keywords.validation";
import { KeywordsService } from "../services/keywords.service";


async function findKeywords(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.keywordFindPayload
    .validate(req.query, { stripUnknown: true })
  const keywords = await KeywordsService.findKeywords(payload)
  res.json({ data: keywords });
}

async function findKeywordById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.keywordFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const keyword = await KeywordsService.findKeywordById(payload.id)
  res.json({ data: keyword });
}

async function createKeyword(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.keywordCreatePayload
    .validate(req.body, { stripUnknown: true })
  const keyword = await KeywordsService.createKeyword(payload)
  res.json({ data: keyword })
}

async function updateKeyword(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.keywordUpdatePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const keyword = await KeywordsService.updateKeyword(payload.id, payload)
  res.json({ data: keyword })
}

async function deleteKeyword(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.keywordDeletePayload
    .validate(req.params, { stripUnknown: true })
  await KeywordsService.deleteKeyword(payload.id)
  res.sendStatus(200);
}

export const KeywordsController = {
  findKeywords,
  findKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
}

