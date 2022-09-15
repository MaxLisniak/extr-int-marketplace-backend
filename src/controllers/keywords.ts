import { RequestHandler } from "express";
import { keywordSchema } from "../validationSchemas/keyword";
import Keyword from "../models/Keyword";

export const getAllKeywords: RequestHandler =
  async (req, res, next) => {
    const keywords = await Keyword
      .query()
      .catch(error => next(error))
    return res.send(keywords);
  }

export const getKeywordsByQuery: RequestHandler =
  async (req, res, next) => {
    const { q } = req.query;
    const keywords = await Keyword
      .query()
      .where('keyword', 'like', `%${q}%`)
      .withGraphFetched("product")
      .catch(error => next(error))
    return res.send(keywords);
  }

export const getKeywordById: RequestHandler =
  async (req, res, next) => {
    const keyword = await Keyword
      .query()
      .findById(req.params.id)
      .catch(error => next(error))
    return res.send(keyword);
  }

export const postKeyword: RequestHandler =
  async (req, res, next) => {
    keywordSchema.validate(req.body)
      .catch(err => next(err))
    const keyword = await Keyword
      .query()
      .insertAndFetch(req.body)
      .catch(error => next(error))
    return res.send(keyword)
  }

export const patchKeyword: RequestHandler =
  async (req, res, next) => {
    keywordSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const keyword = await Keyword
      .query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(keyword)
  }

export const deleteKeyword: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Keyword
      .query()
      .deleteById(id)
      .catch(error => next(error))
    return res.sendStatus(200);
  }



