import { Request, Response, NextFunction } from "express";
import { favoriteSchema } from "../validationSchemas/favorite";
import Favorite from "../models/Favorite";
import { deleteFavorite, getFavoriteById, getFavorites, patchFavorite, postFavorite } from "../services/favorites";

export async function getFavoritesController(req: Request, res: Response): Promise<void> {
  const { user_id, include_product } = req.query;
  const favorites = await getFavorites(
    Number(user_id),
    include_product === "true"
  )
  res.json({ data: favorites });
}

export async function toggleFavoriteController(req: Request, res: Response): Promise<void> {
  const { product_id, user_id } = req.body;
  const fav = await Favorite
    .query()
    .findOne({ product_id, user_id })
  if (!fav) {
    await Favorite.query()
      .insert({
        product_id,
        user_id
      })
  } else {
    await Favorite
      .query()
      .deleteById(fav.id)
  }
  res.sendStatus(200);
}

export async function getFavoriteByIdController(req: Request, res: Response): Promise<void> {
  const { include_product } = req.query
  const paramsPayload = favoriteSchema.validateSync(req.params)
  const favorite = await getFavoriteById(
    paramsPayload.id,
    include_product === "true"
  )
  res.json({ data: favorite })
}

export async function postFavoriteController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = favoriteSchema.validateSync(req.body)
  const favorite = await postFavorite(bodyPayload)
  res.json({ data: favorite })
}

export async function patchFavoriteController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = favoriteSchema.validateSync(req.body)
  const paramsPayload = favoriteSchema.validateSync(req.params)
  const favorite = await patchFavorite(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: favorite })
}

export async function deleteFavoriteController(req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const paramsPayload = favoriteSchema.validateSync(req.params)
  await deleteFavorite(paramsPayload.id)
  res.sendStatus(200);
}