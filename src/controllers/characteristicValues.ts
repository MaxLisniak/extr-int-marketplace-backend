import { Request, Response } from "express";
import {
  characteristicValueCreatePayloadSchema,
  characteristicValueFindOnePayloadSchema,
  characteristicValueUpdatePayloadSchema
} from "../validationSchemas/characteristicValue";
import { idSchema } from "../validationSchemas/id";
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
  const payload = characteristicValueFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const characteristicValue = await findCharacteristicValueById(payload)
  res.json({ data: characteristicValue });
}

export async function createCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const payload = characteristicValueCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const characteristicValue = await createCharacteristicValue(payload)
  res.json({ data: characteristicValue });
}

export async function updateCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const payload = characteristicValueUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const characteristicValue = await updateCharacteristicValue(payload)
  res.json({ data: characteristicValue });
}

export async function deleteCharacteristicValueController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteCharacteristicValue(payload.id)
  res.sendStatus(200);
}