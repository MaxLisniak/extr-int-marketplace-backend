import { RequestHandler } from "express";
import Price from "../models/Price";


export const getAllPrices: RequestHandler =
  async (req, res) => {
    try {
      const prices = await Price.query()
      return res.send(prices);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getPriceById: RequestHandler =
  async (req, res) => {
    try {
      const price = await Price
        .query()
        .findById(req.params.id)
      return res.send(price);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postPrice: RequestHandler =
  async (req, res) => {
    try {
      const queryResult = await Price.query()
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

export const patchPrice: RequestHandler =
  async (req, res,) => {
    try {
      const id = req.params.id
      const queryResult = await Price.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await Price.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deletePrice: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Price.query()
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



