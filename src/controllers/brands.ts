import { Request, Response } from "express";
import {
  brandCreatePayloadSchema,
  brandFindOnePayloadSchema,
  brandFindPayloadSchema,
  brandUpdatePayloadSchema
} from "../validationSchemas/brand";
import { idSchema } from "../validationSchemas/id";
import {
  findBrands,
  findBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../services/brands";

export async function findBrandsController(req: Request, res: Response): Promise<void> {
  const payload = brandFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const brands = await findBrands(payload)
  res.json({ data: brands });
}

export async function findBrandByIdController(req: Request, res: Response): Promise<void> {
  const payload = brandFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const brand = await findBrandById(payload.id)
  res.json({ data: brand });
}

export async function createBrandController(req: Request, res: Response): Promise<void> {
  const payload = brandCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const brand = await createBrand(payload)
  res.json({ data: brand });
}

export async function updateBrandController(req: Request, res: Response): Promise<void> {
  const payload = brandUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const brand = await updateBrand(payload.id, payload)
  res.json({ data: brand });
}

export async function deleteBrandController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteBrand(payload.id)
  res.sendStatus(200);
}