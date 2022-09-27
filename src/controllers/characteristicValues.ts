import { Request, Response } from "express";
import { characteristicValueSchema } from "../validationSchemas/characteristicValue";
import {
  findCharacteristicValues,
  findCharacteristicValueById,
  createCharacteristicValue,
  updateCharacteristicValue,
  deleteCharacteristicValue,
} from "../services/characteristicValues";

export async function findCharacteristicValuesController(req: Request, res: Response): Promise<void> {
  const characteristicValues = await findCharacteristicValues()
  res.json({ data: characteristicValues });
}

export async function findCharacteristicValueByIdController(req: Request, res: Response): Promise<void> {
  const paramsPayload = characteristicValueSchema.validateSync(req.params)
  const characteristicValue = await findCharacteristicValueById(paramsPayload.id)
  res.json({ data: characteristicValue });
}

export async function createCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const bodyPayload = characteristicValueSchema.validateSync(req.body)
  const characteristicValue = await createCharacteristicValue(bodyPayload)
  res.json({ data: characteristicValue });
}

export async function updateCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const bodyPayload = characteristicValueSchema.validateSync(req.body)
  const paramsPayload = characteristicValueSchema.validateSync(req.params)
  const characteristicValue = await updateCharacteristicValue(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: characteristicValue });
}

export async function deleteCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const paramsPayload = characteristicValueSchema.validateSync(req.params)
  await deleteCharacteristicValue(paramsPayload.id)
  res.sendStatus(200);
}