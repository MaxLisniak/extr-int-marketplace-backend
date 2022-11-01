import { Response, Request } from "express";
import {
  attributeToProductFindOnePayloadSchema,
  addAttributeToProductPayloadSchema,
  removeAttributeFromProductPayloadSchema
} from "../validationSchemas/attributeToProduct";
import {
  addAttributeToProduct,
  findAttributeToProductById,
  removeAttributeFromProduct
} from "../services/attributeToProduct";

export async function addAttributeToProductController(req: Request, res: Response): Promise<void> {
  const payload = await addAttributeToProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await addAttributeToProduct(payload)
  res.sendStatus(200);
}
export async function removeAttributeFromProductController(req: Request, res: Response): Promise<void> {
  const payload = await removeAttributeFromProductPayloadSchema
    .validate(req.body, { stripUnknown: true })
  await removeAttributeFromProduct(payload)
  res.sendStatus(200);
}

export async function findAttributeToProductByIdController(req: Request, res: Response): Promise<void> {
  const payload = attributeToProductFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const attributeToProduct = await findAttributeToProductById(payload.id)
  res.json({ data: attributeToProduct });
}