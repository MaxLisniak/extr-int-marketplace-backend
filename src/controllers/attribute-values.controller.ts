import { Request, Response } from "express";
import { AttributeValuesService } from "../services/attribute-values.service";
import { AttributeValuesValidationSchemas } from "../validation-schemas/attribute-values.validation";

async function findAttributeValues(req: Request, res: Response): Promise<void> {
  const payload = await AttributeValuesValidationSchemas.attributeValueFindPayload
    .validate(req.query, { stripUnknown: true })
  const attributeValues = await AttributeValuesService.findAttributeValues(payload)
  res.json({ data: attributeValues });
}

async function findAttributeValueById(req: Request, res: Response): Promise<void> {
  const payload = await AttributeValuesValidationSchemas.attributeValueFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const attributeValue = await AttributeValuesService.findAttributeValueById(payload.id)
  res.json({ data: attributeValue });
}

async function createAttributeValue(req: Request, res: Response): Promise<void> {
  const payload = await AttributeValuesValidationSchemas.attributeValueCreatePayload
    .validate(req.body, { stripUnknown: true })
  const attributeValue = await AttributeValuesService.createAttributeValue(payload)
  res.json({ data: attributeValue });
}

async function updateAttributeValue(req: Request, res: Response): Promise<void> {
  const payload = await AttributeValuesValidationSchemas.attributeValueUpdatePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const attributeValue = await AttributeValuesService.updateAttributeValue(payload.id, payload)
  res.json({ data: attributeValue });
}

async function deleteAttributeValue(req: Request, res: Response): Promise<void> {
  const payload = await AttributeValuesValidationSchemas.attributeValueDeletePayload
    .validate(req.params, { stripUnknown: true })
  await AttributeValuesService.deleteAttributeValue(payload.id)
  res.sendStatus(200);
}

export const AttributeValuesController = {
  findAttributeValues,
  findAttributeValueById,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
}