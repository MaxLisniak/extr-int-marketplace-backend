import { Request, Response } from "express";
import { AttributeNamesService } from "../services/attribute-names.service";
import { AttributeNamesValidationSchemas } from "../validation-schemas/attribute-names.validation";

async function findAttributeNames(req: Request, res: Response): Promise<void> {
  const payload = await AttributeNamesValidationSchemas.attributeNameFindPayload
    .validate(req.query, { stripUnknown: true });
  const attributeNames = await AttributeNamesService.findAttributeNames(payload)
  res.json({ data: attributeNames });
}

async function findAttributeNameById(req: Request, res: Response): Promise<void> {
  const payload = await AttributeNamesValidationSchemas.attributeNameFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const attributeName = await AttributeNamesService.findAttributeNameById(payload.id)
  res.json({ data: attributeName });
}

async function createAttributeName(req: Request, res: Response): Promise<void> {
  const payload = await AttributeNamesValidationSchemas.attributeNameCreatePayload
    .validate(req.body, { stripUnknown: true })
  const attributeName = await AttributeNamesService.createAttributeName(payload)
  res.json({ data: attributeName });
}

async function updateAttributeName(req: Request, res: Response): Promise<void> {
  const payload = await AttributeNamesValidationSchemas.attributeNameUpdatePayload
    .validate({ ...req.params, ...req.body }, { stripUnknown: true })
  const attributeName = await AttributeNamesService.updateAttributeName(payload.id, payload)
  res.json({ data: attributeName });
}

async function deleteAttributeName(req: Request, res: Response): Promise<void> {
  const payload = await AttributeNamesValidationSchemas.attributeNameDeletePayload
    .validate(req.params)
  await AttributeNamesService.deleteAttributeName(payload.id)
  res.sendStatus(200);
}

export const AttributeNamesController = {
  findAttributeNames,
  findAttributeNameById,
  createAttributeName,
  updateAttributeName,
  deleteAttributeName,
}