import { Request, Response } from "express";
import { KeywordsValidationSchemas } from "../validation-schemas/keywords.validation";
import { KeywordsService } from "../services/keywords.service";


async function find(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.findPayload
    .validate(req.query, { stripUnknown: true })
  const keywords = await KeywordsService.findKeywords(payload)
  res.json({ data: keywords });
}

async function findById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.findByIdPayload
    .validate(req.params, { stripUnknown: true })
  const keyword = await KeywordsService.findKeywordById(payload.id)
  res.json({ data: keyword });
}

async function create(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.createPayload
    .validate(req.body, { stripUnknown: true })
  const keyword = await KeywordsService.createKeyword(payload)
  res.json({ data: keyword })
}

async function updateById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.updateByIdPayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const keyword = await KeywordsService.updateKeyword(payload.id, payload)
  res.json({ data: keyword })
}

async function deleteById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.deleteByIdPayload
    .validate(req.params, { stripUnknown: true })
  await KeywordsService.deleteKeyword(payload.id)
  res.sendStatus(200);
}

export const KeywordsController = {
  find,
  findById,
  create,
  updateById,
  deleteById,
}

