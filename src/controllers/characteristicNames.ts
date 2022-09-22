import { Request, Response, NextFunction } from "express";
import { characteristicNameSchema } from "../validationSchemas/characteristicName";
import { deleteCharacteristicName, getCharacteristicNames, getSingleCharacteristicName, patchCharacteristicName, postCharacteristicName } from "../services/characteristicNames";


export async function getCharacteristicNamesController(req: Request, res: Response): Promise<void> {
  const { category_id, include_characteristic_values } = req.query;
  const characteristicNames = await getCharacteristicNames(
    Number(category_id),
    include_characteristic_values === "true"
  )
  res.json({ data: characteristicNames });
}

export async function getCharacteristicNameByIdController(req: Request, res: Response): Promise<void> {
  const { include_characteristic_values } = req.query;
  const paramsPayload = characteristicNameSchema.validateSync(req.params)
  const characteristicName = await getSingleCharacteristicName(
    paramsPayload.id,
    include_characteristic_values === "true"
  )
  res.json({ data: characteristicName });
}

export async function postCharacteristicNameController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const payload = characteristicNameSchema.validateSync(req.body)
  const characteristicName = await postCharacteristicName(payload)
  res.json({ data: characteristicName });
}

export async function patchCharacteristicNameController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = characteristicNameSchema.validateSync(req.body)
  const paramsPayload = characteristicNameSchema.validateSync(req.params)
  const characteristicName = await patchCharacteristicName(
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