import { Request, Response } from "express";
import {
  keywordCreatePayloadSchema,
  keywordFindOnePayloadSchema,
  keywordFindPayloadSchema,
  keywordUpdatePayloadSchema
} from "../validationSchemas/keyword";
import {
  findKeywords,
  findKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
} from "../services/keywords";
import { idSchema } from "../validationSchemas/id";

export async function findKeywordsController(req: Request, res: Response): Promise<void> {
  const payload = keywordFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const keywords = await findKeywords(payload)
  res.json({ data: keywords });
}

export async function findKeywordByIdController(req: Request, res: Response): Promise<void> {
  const payload = keywordFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const keyword = await findKeywordById(payload.id)
  res.json({ data: keyword });
}

export async function createKeywordController(req: Request, res: Response): Promise<void> {
  const payload = keywordCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const keyword = await createKeyword(payload)
  res.json({ data: keyword })
}

export async function updateKeywordController(req: Request, res: Response): Promise<void> {
  const payload = keywordUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const keyword = await updateKeyword(payload.id, payload)
  res.json({ data: keyword })
}

export async function deleteKeywordController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteKeyword(payload.id)
  res.sendStatus(200);
}



