import { Response, Request } from "express";
import { AttributeToProductValidationSchemas } from "../validation-schemas/attribute-to-product.validation";
import { AttributeToProductService } from "../services/attribute-to-product.service";


async function addAttributeToProduct(req: Request, res: Response): Promise<void> {
  const payload = await AttributeToProductValidationSchemas.addAttributeToProductPayload
    .validate(req.body, { stripUnknown: true })
  await AttributeToProductService.addAttributeToProduct(payload)
  res.sendStatus(200);
}
async function removeAttributeFromProduct(req: Request, res: Response): Promise<void> {
  const payload = await AttributeToProductValidationSchemas.removeAttributeFromProductPayload
    .validate(req.body, { stripUnknown: true })
  await AttributeToProductService.removeAttributeFromProduct(payload)
  res.sendStatus(200);
}

async function findAttributeToProductById(req: Request, res: Response): Promise<void> {
  const payload = await AttributeToProductValidationSchemas.attributeToProductFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const attributeToProduct = await AttributeToProductService.findAttributeToProductById(payload.id)
  res.json({ data: attributeToProduct });
}

export const AttributeToProductController = {
  addAttributeToProduct,
  removeAttributeFromProduct,
  findAttributeToProductById,
}