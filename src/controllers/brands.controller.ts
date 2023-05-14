import { Request, Response } from "express";
import { BrandsValidationSchemas } from "../validation-schemas/brands.validation";
import { BrandsService } from "../services/brands.service";


async function find(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.findPayload
    .validate(req.query, { stripUnknown: true })
  const brands = await BrandsService.find(payload)
  res.json({ data: brands });
}

async function findById(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.findByIdPayload
    .validate(req.params, { stripUnknown: true })
  const brand = await BrandsService.findById(payload.id)
  res.json({ data: brand });
}

async function create(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.createPayload
    .validate(req.body, { stripUnknown: true })
  const brand = await BrandsService.create(payload)
  res.json({ data: brand });
}

async function updateById(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.updateByIdPayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const brand = await BrandsService.updateById(payload.id, payload)
  res.json({ data: brand });
}

async function deleteById(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.deleteByIdPaylaod
    .validate(req.params, { stripUnknown: true })
  await BrandsService.deleteById(payload.id)
  res.sendStatus(200);
}

export const BrandsController = {
  find,
  findById,
  create,
  updateById,
  deleteById,
}