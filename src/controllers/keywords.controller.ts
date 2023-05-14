import { Request, Response } from "express";
import { KeywordsValidationSchemas } from "../validation-schemas/keywords.validation";
import { KeywordsService } from "../services/keywords.service";


async function find(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.findPayload
    .validate(req.query, { stripUnknown: true })
  const keywords = await KeywordsService.find(payload)
  res.json({ data: keywords });
}

async function findById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.findByIdPayload
    .validate(req.params, { stripUnknown: true })
  const keyword = await KeywordsService.findById(payload.id)
  res.json({ data: keyword });
}

async function create(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.createPayload
    .validate(req.body, { stripUnknown: true })
  const keyword = await KeywordsService.create(payload)
  res.json({ data: keyword })
}

async function updateById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.updateByIdPayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const keyword = await KeywordsService.updateById(payload.id, payload)
  res.json({ data: keyword })
}

async function deleteById(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.deleteByIdPayload
    .validate(req.params, { stripUnknown: true })
  await KeywordsService.deleteById(payload.id)
  res.sendStatus(200);
}

async function addToProduct(req: Request, res: Response): Promise<void> {
  console.log(req.params)
  const payload = await KeywordsValidationSchemas.addToProductPayload
    .validate(req.params, { stripUnknown: true })
  await KeywordsService.addToProduct(payload)
  res.sendStatus(200);
}

async function removeFromProduct(req: Request, res: Response): Promise<void> {
  const payload = await KeywordsValidationSchemas.removeFromProductPayload
    .validate(req.params, { stripUnknown: true })
  await KeywordsService.removeFromProduct(payload)
  res.sendStatus(200);
}

export const KeywordsController = {
  find,
  findById,
  create,
  updateById,
  deleteById,
  addToProduct,
  removeFromProduct
}

