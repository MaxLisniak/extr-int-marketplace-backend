import User from "../models/users.model"
import Favorite from "../models/favorites.model"
import { AddFavoritePayload, FavoriteProductsFindPayload, RemoveFavoritePayload } from "../lib/types/favorites.types"

async function addFavoriteProduct(payload: AddFavoritePayload) {

  const { user_id, product_id } = payload

  return await User.relatedQuery("favoriteProducts")
    .for(user_id)
    .relate(product_id)
}

async function removeFavoriteProduct(payload: RemoveFavoritePayload) {

  const { user_id, product_id } = payload

  return await User.relatedQuery("favoriteProducts")
    .for(user_id)
    .unrelate()
    .where('products.id', product_id)
}

async function findFavoriteProducts(params: FavoriteProductsFindPayload) {
  return await Favorite
    .query()
    .where({ user_id: params.user_id })
    .withGraphFetched('product')
}

export const FavoritesService = {
  addFavoriteProduct,
  removeFavoriteProduct,
  findFavoriteProducts,
}