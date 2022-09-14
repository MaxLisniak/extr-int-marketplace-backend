import path from "path";
import { Product as ProductType } from "../types";
import Model from "./BaseModel";

class Favorite extends Model {
  id: number
  product_id: number
  user_id: number
  product: ProductType

  static get tableName() {
    return "favorites"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_id',
        'product_id',
      ],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        product_id: { type: 'integer' }
      }
    };
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
