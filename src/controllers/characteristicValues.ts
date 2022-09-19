import { Request, Response, NextFunction } from "express";
import { characteristicValueSchema } from "../validationSchemas/characteristicValue";
import CharacteristicValue from "../models/CharacteristicValue";

export async function getAllCharacteristicValues
  (req: Request, res: Response): Promise<void> {
  const characteristicValues = await CharacteristicValue
    .query()
    .withGraphFetched('characteristic_name')
    .orderBy("characteristic_name_id", "ASC")

  res.send({ data: { characteristicValues } });
}

export async function getCharacteristicValueById
  (req: Request, res: Response): Promise<void> {
  const characteristicValue = await CharacteristicValue
    .query()
    .findById(req.params.id)
    .withGraphFetched('characteristic_name')
  res.send({ data: { characteristicValue } });
}

export async function postCharacteristicValue
  (req: Request, res: Response, next: NextFunction) {
  characteristicValueSchema.validate(req.body)
    .catch(err => next(err))
  const characteristicValue = await CharacteristicValue
    .query()
    .insertAndFetch(req.body)
  res.send({ data: { characteristicValue } });
}

export async function patchCharacteristicValue
  (req: Request, res: Response, next: NextFunction) {
  characteristicValueSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const characteristicValue = await CharacteristicValue
    .query()
    .patchAndFetchById(id, req.body)
  res.send({ data: { characteristicValue } });
}

export async function deleteCharacteristicValue
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await CharacteristicValue
    .query()
    .deleteById(id)
  res.sendStatus(200);
}