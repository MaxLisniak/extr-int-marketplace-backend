import { RequestHandler } from "express";
import Characteristic from "../models/Characteristic";

export const getAllCharacteristics: RequestHandler =
  async (req, res) => {
    try {
      const characteristics = await Characteristic
        .query()
        .withGraphFetched('characteristic_name')
        .orderBy("characteristic_name_id", "ASC")
      return res.send(characteristics);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCharacteristicById: RequestHandler =
  async (req, res) => {
    try {
      const characteristic = await Characteristic
        .query()
        .findById(req.params.id)
        .withGraphFetched('characteristic_name');
      return res.send(characteristic);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postCharacteristic: RequestHandler =
  async (req, res) => {
    try {
      const queryResult = await Characteristic.query()
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

export const patchCharacteristic: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Characteristic.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await Characteristic.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deleteCharacteristic: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Characteristic.query()
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