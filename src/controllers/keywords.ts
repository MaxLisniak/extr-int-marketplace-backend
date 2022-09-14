import { RequestHandler } from "express";
import Keyword from "../models/Keyword";

export const getAllKeywords: RequestHandler =
  async (req, res) => {
    try {
      const keywords = await Keyword.query()
      return res.send(keywords);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getKeywordsByQuery: RequestHandler =
  async (req, res) => {
    try {
      const { q } = req.query;
      const keywords = await Keyword.query()
        .where('keyword', 'like', `%${q}%`)
        .withGraphFetched("product")
      return res.send(keywords);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getKeywordById: RequestHandler =
  async (req, res) => {
    try {
      const keyword = await Keyword
        .query()
        .findById(req.params.id)
      return res.send(keyword);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postKeyword: RequestHandler =
  async (req, res) => {
    try {
      const queryResult = await Keyword.query()
        .insert(req.body);
      if (queryResult) {
        return res.send(queryResult);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const patchKeyword: RequestHandler =
  async (req, res,) => {
    try {
      const id = req.params.id
      const queryResult = await Keyword.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await Keyword.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deleteKeyword: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Keyword.query()
        .deleteById(id)
      if (queryResult)
        return res.sendStatus(200);
      else
        return res.sendStatus(400);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }



