import { Request, Response } from "express";
import {
  characteristicNameCreatePayloadSchema,
  characteristicNameUpdatePayloadSchema,
  characteristicNameFindPayloadSchema,
  characteristicNameFindOnePayloadSchema,
} from "../validationSchemas/characteristicName";
import { idSchema } from '../validationSchemas/id'; import {
  findCharacteristicNames,
  findCharacteristicNameById,
  createCharacteristicName,
  updateCharacteristicName,
  deleteCharacteristicName,
} from "../services/characteristicNames";


export async function findCharacteristicNamesController(req: Request, res: Response): Promise<void> {
  const payload = characteristicNameFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const characteristicNames = await findCharacteristicNames(payload)
  res.json({ data: characteristicNames });
}

export async function findCharacteristicNameByIdController(req: Request, res: Response): Promise<void> {
  const payload = characteristicNameFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const characteristicName = await findCharacteristicNameById(payload.id)
  res.json({ data: characteristicName });
}

export async function createCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const payload = characteristicNameCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const characteristicName = await createCharacteristicName(payload)
  res.json({ data: characteristicName });
}

export async function updateCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const payload = characteristicNameUpdatePayloadSchema
    .validateSync({ ...req.params, ...req.body }, { stripUnknown: true })
  const characteristicName = await updateCharacteristicName(payload.id, payload)
  res.json({ data: characteristicName });
}

export async function deleteCharacteristicNameController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params)
  await deleteCharacteristicName(payload.id)
  res.sendStatus(200);
}