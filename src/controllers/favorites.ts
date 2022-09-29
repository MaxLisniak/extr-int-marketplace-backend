import { Request, Response } from "express";
import { addFavoriteProduct, removeFavoriteProduct } from "../services/favorites";
import { favoriteSchema } from "../validationSchemas/favorite";

export async function addFavoriteProductController(req: Request, res: Response): Promise<void> {
  const payload = favoriteSchema.validateSync(req.body, { stripUnknown: true });
  await addFavoriteProduct(payload)
  res.sendStatus(200)
}

export async function removeFavoriteProductController(req: Request, res: Response): Promise<void> {
  const payload = favoriteSchema.validateSync(req.body, { stripUnknown: true });
  await removeFavoriteProduct(payload)
  res.sendStatus(200)
}