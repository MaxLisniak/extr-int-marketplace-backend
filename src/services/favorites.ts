import { patchFavoriteController } from "../controllers/favorites"
import { favoriteType } from "../validationSchemas/favorite"
import Favorite from "../models/Favorite"

export function getFavorites(
  user_id?: number,
  include_product?: Boolean
) {
  const query = Favorite.query()
  if (user_id) {
    query.where({ user_id: user_id })
  }
  if (include_product) {
    query.withGraphFetched("product")
  }
  return query
}

export function getFavoriteById(
  id: number,
  include_product?: Boolean
) {
  const query = Favorite
    .query()
    .findById(id)
  if (include_product) {
    query.withGraphFetched("product")
  }
  return query
}

export function postFavorite(payload: favoriteType) {
  const query = Favorite
    .query()
    .insertAndFetch(payload)
  return query
}

export function patchFavorite(
  id: number,
  payload: favoriteType
) {
  const query = Favorite
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteFavorite(id: number) {
  const query = Favorite
    .query()
    .deleteById(id)
  return query
}