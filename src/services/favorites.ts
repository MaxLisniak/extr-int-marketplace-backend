import User from "../models/User"
import Favorite from "../models/Favorite"
import { favoriteFindPayloadType, favoriteType } from "../validationSchemas/favorite"

export async function addFavoriteProduct(payload: favoriteType) {

  const { user_id, product_id } = payload

  return User.relatedQuery("favoriteProducts")
    .for(user_id)
    .relate(product_id)
}

export async function removeFavoriteProduct(payload: favoriteType) {

  const { user_id, product_id } = payload

  return User.relatedQuery("favoriteProducts")
    .for(user_id)
    .unrelate()
    .where('products.id', product_id)
}

export function findFavoriteProducts(params: favoriteFindPayloadType) {
  return Favorite
    .query()
    .where({ user_id: params.user_id })
    .withGraphFetched('product')
}