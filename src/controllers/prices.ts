import { RequestHandler } from "express";
import { priceSchema } from "../validationSchemas/price";
import Price from "../models/Price";


export const getAllPrices: RequestHandler =
  async (req, res, next) => {
    const prices = await Price
      .query()

    return res.send(prices);
  }

export const getPriceById: RequestHandler =
  async (req, res, next) => {
    const price = await Price
      .query()
      .findById(req.params.id)

    return res.send(price);
  }

export const postPrice: RequestHandler =
  async (req, res, next) => {
    priceSchema.validate(req.body)
      .catch(err => next(err))
    const price = await Price
      .query()
      .insertAndFetch(req.body)

    return res.send(price)
  }

export const patchPrice: RequestHandler =
  async (req, res, next) => {
    priceSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const price = await Price
      .query()
      .patchAndFetchById(id, req.body)

    return res.send(price)
  }

export const deletePrice: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Price
      .query()
      .deleteById(id)

    return res.sendStatus(200);
  }
