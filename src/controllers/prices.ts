import { RequestHandler } from "express";
import Price from "../models/Price";


export const getAllPrices: RequestHandler =
  async (req, res, next) => {
    const prices = await Price
      .query()
      .catch(error => next(error))
    return res.send(prices);
  }

export const getPriceById: RequestHandler =
  async (req, res, next) => {
    const price = await Price
      .query()
      .findById(req.params.id)
      .catch(error => next(error))
    return res.send(price);
  }

export const postPrice: RequestHandler =
  async (req, res, next) => {
    const price = await Price
      .query()
      .insertAndFetch(req.body)
      .catch(error => next(error))
    return res.send(price)
  }

export const patchPrice: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const price = await Price
      .query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(price)
  }

export const deletePrice: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Price
      .query()
      .deleteById(id)
      .catch(error => next(error))
    return res.sendStatus(200);
  }
