import { Request, Response } from "express";
import { ProductsValidationSchemas } from "../validation-schemas/products.validation";
import { ProductsService } from "../services/products.service";


async function findById(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.findByIdPayload
    .validate(req.params, { stripUnknown: true })

  const product = await ProductsService.findById(payload.id)
  res.json({ data: product });
}

async function findByFilters(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.findByFiltersPayload.validate({ ...req.body })
  const [products, total] = await ProductsService.findByFilters(payload);
  res.json({ data: products, total: total[0] })
}

async function getFilterList(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.getFilterList
    .validate(req.query, { stripUnknown: true });
  const filterList = await ProductsService.getFilterList(payload.category_id)
  res.json({ data: filterList });
}

async function create(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.createPayload
    .validate({ ...req.body }, { stripUnknown: true })
  const product = await ProductsService.create(payload)
  res.json({ data: product });
}

async function updateById(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.updateByIdPayload
    .validate({ ...req.params, ...req.body }, { stripUnknown: true })
  const product = await ProductsService.updateById(payload.id, payload)
  res.json({ data: product })
}

async function deleteById(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.deleteByIdPayload
    .validate(req.params, { stripUnknown: true })
  await ProductsService.deleteById(payload.id)
  res.sendStatus(200);
}

async function addAttribute(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.addAttributePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })

  await ProductsService.addAttribute(payload)
  res.sendStatus(200);
}

async function removeAttribute(req: Request, res: Response): Promise<void> {
  const payload = await ProductsValidationSchemas.removeAttributePayload
    .validate(req.params, { stripUnknown: true })

  await ProductsService.removeAttribute(payload)
  res.sendStatus(200);
}

export const ProductsController = {
  findById,
  findByFilters,
  create,
  updateById,
  deleteById,
  addAttribute,
  removeAttribute,
  getFilterList,
}