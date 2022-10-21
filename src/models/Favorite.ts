import path from "path";
import Product from "./Product";
import Model from "./BaseModel";

class Favorite extends Model {
  id: number
  product_id: number
  user_id: number
  product: Product

  static get tableName() {
    return "favorites"
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "Product"),
      join: {
        from: 'products.id',
        to: 'favorites.product_id'
      }
    },
  }
}

export default Favorite;
