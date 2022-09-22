import { Request, Response, NextFunction } from "express";
import { characteristicValueSchema } from "../validationSchemas/characteristicValue";
import { deleteCharacteristicValue, getCharacteristicValueById, getCharacteristicValues, patchCharacteristicValue, postCharacteristicValue } from "../services/characteristicValues";

export async function getCharacteristicValuesController(req: Request, res: Response): Promise<void> {
  const characteristicValues = await getCharacteristicValues()
  res.json({ data: characteristicValues });
}

export async function getCharacteristicValueByIdController(req: Request, res: Response): Promise<void> {
  const paramsPayload = characteristicValueSchema.validateSync(req.params)
  const characteristicValue = await getCharacteristicValueById(paramsPayload.id)
  res.json({ data: characteristicValue });
}

export async function postCharacteristicValueController(req: Request, res: Response, next: NextFunction) {
  const bodyPayload = characteristicValueSchema.validateSync(req.body)
  const characteristicValue = await postCharacteristicValue(bodyPayload)
  res.json({ data: characteristicValue });
}

export async function patchCharacteristicValueController(req: Request, res: Response, next: NextFunction) {
  const bodyPayload = characteristicValueSchema.validateSync(req.body)
  const paramsPayload = characteristicValueSchema.validateSync(req.params)
  const characteristicValue = await patchCharacteristicValue(
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