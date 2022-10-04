import { Request, Response } from "express";
import {
  attributeNameCreatePayloadSchema,
  attributeNameUpdatePayloadSchema,
  attributeNameFindOnePayloadSchema,
} from "../validationSchemas/attributeName";
import { idSchema } from '../validationSchemas/id'; import {
  findAttributeNames,
  findAttributeNameById,
  createAttributeName,
  updateAttributeName,
  deleteAttributeName,
} from "../services/attributeNames";


export async function findAttributeNamesController(req: Request, res: Response): Promise<void> {
  // const payload = attributeNameFindPayloadSchema
  //   .validateSync(req.query, { stripUnknown: true })
  const attributeNames = await findAttributeNames()
  res.json({ data: attributeNames });
}

export async function findAttributeNameByIdController(req: Request, res: Response): Promise<void> {
  const payload = attributeNameFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const attributeName = await findAttributeNameById(payload.id)
  res.json({ data: attributeName });
}

export async function createAttributeNameController(req: Request, res: Response): Promise<void> {
  const payload = attributeNameCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const attributeName = await createAttributeName(payload)
  res.json({ data: attributeName });
}

export async function updateAttributeNameController(req: Request, res: Response): Promise<void> {
  const payload = attributeNameUpdatePayloadSchema
    .validateSync({ ...req.params, ...req.body }, { stripUnknown: true })
  const attributeName = await updateAttributeName(payload.id, payload)
  res.json({ data: attributeName });
}

export async function deleteAttributeNameController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params)
  await deleteAttributeName(payload.id)
  res.sendStatus(200);
}