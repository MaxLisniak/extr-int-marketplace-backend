import { Request, Response } from "express";
import { characteristicNameSchema } from "../validationSchemas/characteristicName";
import {
  findCharacteristicNames,
  findCharacteristicNameById,
  createCharacteristicName,
  updateCharacteristicName,
  deleteCharacteristicName,
} from "../services/characteristicNames";


export async function findCharacteristicNamesController(req: Request, res: Response): Promise<void> {
  const { category_id, include_characteristic_values } = req.query;
  const characteristicNames = await findCharacteristicNames(
    Number(category_id),
    include_characteristic_values === "true"
  )
  res.json({ data: characteristicNames });
}

export async function findCharacteristicNameByIdController(req: Request, res: Response): Promise<void> {
  const { include_characteristic_values } = req.query;
  const paramsPayload = characteristicNameSchema.validateSync(req.params)
  const characteristicName = await findCharacteristicNameById(
    paramsPayload.id,
    include_characteristic_values === "true"
  )
  res.json({ data: characteristicName });
}

export async function createCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const payload = characteristicNameSchema.validateSync(req.body)
  const characteristicName = await createCharacteristicName(payload)
  res.json({ data: characteristicName });
}

export async function updateCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const bodyPayload = characteristicNameSchema.validateSync(req.body)
  const paramsPayload = characteristicNameSchema.validateSync(req.params)
  const characteristicName = await updateCharacteristicName(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: characteristicName });
}

export async function deleteCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const paramsPayload = characteristicNameSchema.validateSync(req.params)
  await deleteCharacteristicName(paramsPayload.id)
  res.sendStatus(200);
}