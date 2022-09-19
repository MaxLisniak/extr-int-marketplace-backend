import { RequestHandler } from "express";
import { characteristicSchema } from "../validationSchemas/characteristic";
import Characteristic from "../models/Characteristic";

export const getAllCharacteristics: RequestHandler =
  async (req, res, next) => {
    const characteristics = await Characteristic
      .query()
      .withGraphFetched('characteristic_name')
      .orderBy("characteristic_name_id", "ASC")

    return res.send(characteristics);
  }

export const getCharacteristicById: RequestHandler =
  async (req, res, next) => {
    const characteristic = await Characteristic
      .query()
      .findById(req.params.id)
      .withGraphFetched('characteristic_name')

    return res.send(characteristic);
  }

export const postCharacteristic: RequestHandler =
  async (req, res, next) => {
    characteristicSchema.validate(req.body)
      .catch(err => next(err))
    const characteristic = await Characteristic
      .query()
      .insertAndFetch(req.body)

    return res.send(characteristic);
  }

export const patchCharacteristic: RequestHandler =
  async (req, res, next) => {
    characteristicSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const characteristic = await Characteristic
      .query()
      .patchAndFetchById(id, req.body)

    return res.send(characteristic);
  }

export const deleteCharacteristic: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Characteristic
      .query()
      .deleteById(id)

    return res.sendStatus(200);
  }