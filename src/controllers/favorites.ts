import { Request, Response, NextFunction } from "express";
import { favoriteSchema } from "../validationSchemas/favorite";
import Favorite from "../models/Favorite";

export async function getAllFavorites
  (req: Request, res: Response): Promise<void> {
  const { user_id, include_product } = req.query;

  let query = Favorite
    .query()

  if (user_id) {
    query = query
      .where({ user_id: user_id })
  }
  if (include_product === "true") {
    query = query
      .withGraphFetched("product")
  }
  const favorites = await query;
  res.send({ data: { favorites } });
}

export async function toggleFavorite
  (req: Request, res: Response): Promise<void> {
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

// export async function getFavoritesForUser
//   (req: Request, res: Response): Promise<void> {
//   const { user_id } = req.query;
//   const favorites = await Favorite
//     .query()
//     .withGraphFetched("product")
//     .where({ user_id: user_id })

//   if (favorites) {
//     const products = favorites.map((fav) => fav.product);
//     res.send({ data: { products } });
//   }
// }

export async function getFavoriteById
  (req: Request, res: Response): Promise<void> {
  const { include_product } = req.query

  let query = Favorite
    .query()
    .findById(req.params.id)

  if (include_product === "true") {
    query = query
      .withGraphFetched("product")
  }

  const favorite = await query
  res.send({ data: { favorite } })
}

export async function postFavorite
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  favoriteSchema.validate(req.body)
    .catch(err => next(err))
  const favorite = await Favorite
    .query()
    .insertAndFetch(req.body)

  res.send({ data: { favorite } })
}

export async function patchFavorite
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  favoriteSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const favorite = await Favorite
    .query()
    .patchAndFetchById(id, req.body)

  res.send({ data: { favorite } })
}

export async function deleteFavorite
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Favorite
    .query()
    .deleteById(id)

  res.sendStatus(200);
}