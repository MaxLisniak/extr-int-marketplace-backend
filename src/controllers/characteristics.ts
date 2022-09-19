import { Request, Response, NextFunction } from "express";
import { characteristicSchema } from "../validationSchemas/characteristic";
import Characteristic from "../models/Characteristic";

export async function getAllCharacteristics
  (req: Request, res: Response): Promise<void> {
  const characteristics = await Characteristic
    .query()
    .withGraphFetched('characteristic_name')
    .orderBy("characteristic_name_id", "ASC")

  res.send({ data: { characteristics } });
}

export async function getCharacteristicById
  (req: Request, res: Response): Promise<void> {
  const characteristic = await Characteristic
    .query()
    .findById(req.params.id)
    .withGraphFetched('characteristic_name')
  res.send({ data: { characteristic } });
}

export async function postCharacteristic
  (req: Request, res: Response, next: NextFunction) {
  characteristicSchema.validate(req.body)
    .catch(err => next(err))
  const characteristic = await Characteristic
    .query()
    .insertAndFetch(req.body)
  res.send({ data: { characteristic } });
}

export async function patchCharacteristic
  (req: Request, res: Response, next: NextFunction) {
  characteristicSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const characteristic = await Characteristic
    .query()
    .patchAndFetchById(id, req.body)
  res.send({ data: { characteristic } });
}

export async function deleteCharacteristic
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Characteristic
    .query()
    .deleteById(id)
  res.sendStatus(200);
}