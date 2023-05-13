import { Request, Response } from "express";
import { BrandsValidationSchemas } from "../validation-schemas/brands.validation";
import { BrandsService } from "../services/brands.service";


async function findBrands(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.brandFindPayload
    .validate(req.query, { stripUnknown: true })
  const brands = await BrandsService.findBrands(payload)
  res.json({ data: brands });
}

async function findBrandById(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.brandFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const brand = await BrandsService.findBrandById(payload.id)
  res.json({ data: brand });
}

async function createBrand(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.brandCreatePayload
    .validate(req.body, { stripUnknown: true })
  const brand = await BrandsService.createBrand(payload)
  res.json({ data: brand });
}

async function updateBrand(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.brandUpdatePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const brand = await BrandsService.updateBrand(payload.id, payload)
  res.json({ data: brand });
}

async function deleteBrand(req: Request, res: Response): Promise<void> {
  const payload = await BrandsValidationSchemas.brandDeletePayload
    .validate(req.params, { stripUnknown: true })
  await BrandsService.deleteBrand(payload.id)
  res.sendStatus(200);
}

export const BrandsController = {
  findBrands,
  findBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
}