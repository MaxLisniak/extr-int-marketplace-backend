import { Request, Response } from "express";
import { keywordSchema } from "../validationSchemas/keyword";
import {
  findKeywords,
  findKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
} from "../services/keywords";

export async function findKeywordsController(req: Request, res: Response): Promise<void> {
  const { search_query, include_product } = req.query;
  const keywords = await findKeywords(
    !search_query ? undefined : String(search_query),
    include_product === "true"
  )
  res.json({ data: keywords });
}

export async function findKeywordByIdController(req: Request, res: Response): Promise<void> {
  const { include_product } = req.query;
  const paramsPayload = keywordSchema.validateSync(req.params)
  const keyword = await findKeywordById(
    paramsPayload.id,
    include_product === "true"
  )
  res.json({ data: keyword });
}

export async function createKeywordController(req: Request, res: Response): Promise<void> {
  const bodyPayload = keywordSchema.validateSync(req.body)
  const keyword = await createKeyword(bodyPayload)
  res.json({ data: keyword })
}

export async function updateKeywordController(req: Request, res: Response): Promise<void> {
  const bodyPayload = keywordSchema.validateSync(req.body)
  const paramsPayload = keywordSchema.validateSync(req.params)
  const keyword = await updateKeyword(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: keyword })
}

export async function deleteKeywordController(req: Request, res: Response): Promise<void> {
  const paramsPayload = keywordSchema.validateSync(req.params)
  await deleteKeyword(paramsPayload.id)
  res.sendStatus(200);
}



