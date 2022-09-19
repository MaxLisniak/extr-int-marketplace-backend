import { Request, Response, NextFunction } from "express";
import { keywordSchema } from "../validationSchemas/keyword";
import Keyword from "../models/Keyword";

export async function getAllKeywords
  (req: Request, res: Response): Promise<void> {
  const keywords = await Keyword
    .query()

  res.send({ data: { keywords } });
}

export async function getKeywordsByQuery
  (req: Request, res: Response): Promise<void> {
  const { q } = req.query;
  const keywords = await Keyword
    .query()
    .where('keyword', 'like', `%${q}%`)
    .withGraphFetched("product")

  res.send({ data: { keywords } });
}

export async function getKeywordById
  (req: Request, res: Response): Promise<void> {
  const keyword = await Keyword
    .query()
    .findById(req.params.id)

  res.send({ data: { keyword } });
}

export async function postKeyword
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  keywordSchema.validate(req.body)
    .catch(err => next(err))
  const keyword = await Keyword
    .query()
    .insertAndFetch(req.body)

  res.send({ data: { keyword } })
}

export async function patchKeyword
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  keywordSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const keyword = await Keyword
    .query()
    .patchAndFetchById(id, req.body)

  res.send({ data: { keyword } })
}

export async function deleteKeyword
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Keyword
    .query()
    .deleteById(id)

  res.sendStatus(200);
}



