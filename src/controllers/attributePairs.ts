import { Request, Response } from "express";
import {
  attributePairCreatePayloadSchema,
  attributePairUpdatePayloadSchema,
  attributePairFindOnePayloadSchema,
} from "../validationSchemas/attributePair";
import { idSchema } from '../validationSchemas/id';
import {
  findAttributePairs,
  findAttributePairById,
  createAttributePair,
  updateAttributePair,
  deleteAttributePair,
} from "../services/attributePairs";


export async function findAttributePairsController(req: Request, res: Response): Promise<void> {
  const attributePairs = await findAttributePairs()
  res.json({ data: attributePairs });
}

export async function findAttributePairByIdController(req: Request, res: Response): Promise<void> {
  const payload = attributePairFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const attributePair = await findAttributePairById(payload.id)
  res.json({ data: attributePair });
}

export async function createAttributePairController(req: Request, res: Response): Promise<void> {
  const payload = attributePairCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const attributePair = await createAttributePair(payload)
  res.json({ data: attributePair });
}

export async function updateAttributePairController(req: Request, res: Response): Promise<void> {
  const payload = attributePairUpdatePayloadSchema
    .validateSync({ ...req.params, ...req.body }, { stripUnknown: true })
  const attributePair = await updateAttributePair(payload.id, payload)
  res.json({ data: attributePair });
}

export async function deleteAttributePairController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params)
  await deleteAttributePair(payload.id)
  res.sendStatus(200);
}