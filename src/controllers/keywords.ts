import { Request, Response, NextFunction } from "express";
import { keywordSchema } from "../validationSchemas/keyword";
import Keyword from "../models/Keyword";
import { deleteKeyword, getKeywordById, getKeywords, patchKeyword, postKeyword } from "../services/keywords";

export async function getKeywordsController(req: Request, res: Response): Promise<void> {
  const { search_query, include_product } = req.query;
  const keywords = await getKeywords(
    !search_query ? undefined : String(search_query),
    include_product === "true"
  )
  res.json({ data: keywords });
}

export async function getKeywordByIdController(req: Request, res: Response): Promise<void> {
  const { include_product } = req.query;
  const paramsPayload = keywordSchema.validateSync(req.params)
  const keyword = await getKeywordById(
    paramsPayload.id,
    include_product === "true"
  )
  res.json({ data: keyword });
}

export async function postKeywordController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = keywordSchema.validateSync(req.body)
  const keyword = await postKeyword(bodyPayload)
  res.json({ data: keyword })
}

export async function patchKeywordController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = keywordSchema.validateSync(req.body)
  const paramsPayload = keywordSchema.validateSync(req.params)
  const keyword = await patchKeyword(
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



