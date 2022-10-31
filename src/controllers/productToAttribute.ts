import { Response, Request } from "express";
import {
  productToAttributeFindOnePayloadSchema,
  addAttributeToProductPayloadSchema,
  removeAttributeFromProductPayloadSchema
} from "../validationSchemas/productToAttribute";
import {
  addAttributeToProduct,
  findProductToAttributeById,
  removeAttributeFromProduct
} from "../services/productToAttribute";

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

export async function findProductToAttributeByIdController(req: Request, res: Response): Promise<void> {
  const payload = productToAttributeFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const productToAttribute = await findProductToAttributeById(payload.id)
  res.json({ data: productToAttribute });
}