import { Request, Response } from "express";
import {
  attributeValueCreatePayloadSchema,
  attributeValueFindOnePayloadSchema,
  attributeValueFindPayloadSchema,
  attributeValueUpdatePayloadSchema
} from "../validationSchemas/attributeValue";
import { idSchema } from "../validationSchemas/id";
import {
  findAttributeValues,
  findAttributeValueById,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "../services/attributeValues";

export async function findAttributeValuesController(req: Request, res: Response): Promise<void> {
  const payload = attributeValueFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const attributeValues = await findAttributeValues(payload)
  res.json({ data: attributeValues });
}

export async function findAttributeValueByIdController(req: Request, res: Response): Promise<void> {
  const payload = attributeValueFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const attributeValue = await findAttributeValueById(payload.id)
  res.json({ data: attributeValue });
}

export async function createAttributeValueController(req: Request, res: Response): Promise<void> {
  const payload = attributeValueCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const attributeValue = await createAttributeValue(payload)
  res.json({ data: attributeValue });
}

export async function updateAttributeValueController(req: Request, res: Response): Promise<void> {
  const payload = attributeValueUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const attributeValue = await updateAttributeValue(payload.id, payload)
  res.json({ data: attributeValue });
}

export async function deleteAttributeValueController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteAttributeValue(payload.id)
  res.sendStatus(200);
}