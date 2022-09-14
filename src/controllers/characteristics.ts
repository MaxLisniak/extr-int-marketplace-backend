import { RequestHandler } from "express";
import Characteristic from "../models/Characteristic";

export const getAllCharacteristics: RequestHandler =
  async (req, res, next) => {
    const characteristics = await Characteristic
      .query()
      .withGraphFetched('characteristic_name')
      .orderBy("characteristic_name_id", "ASC")
      .catch(error => next(error))
    return res.send(characteristics);
  }

export const getCharacteristicById: RequestHandler =
  async (req, res, next) => {
    const characteristic = await Characteristic
      .query()
      .findById(req.params.id)
      .withGraphFetched('characteristic_name')
      .catch(error => next(error))
    return res.send(characteristic);
  }

export const postCharacteristic: RequestHandler =
  async (req, res, next) => {
    const characteristic = await Characteristic
      .query()
      .insert(req.body)
      .catch(error => next(error))
    return res.send(characteristic);
  }

export const patchCharacteristic: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const characteristic = await Characteristic
      .query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(characteristic);
  }

export const deleteCharacteristic: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Characteristic
      .query()
      .deleteById(id)
      .catch(error => next(error))
    return res.send(queryResult)
  }