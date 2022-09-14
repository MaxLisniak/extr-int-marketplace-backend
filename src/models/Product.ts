import Model from "./BaseModel";
import Characteristic from "./Characteristic";
import Comment from "./Comment";
import Favorite from "./Favorite";
import Keyword from "./Keyword";
import Price from "./Price";
import Subcategory from "./Subcategory";

class Product extends Model {
  id: number
  name: string
  description: string
  image_url: string
  subcategory_id: number
  number_of_favorites: number
  latest_price: number

  static get tableName() {
    return "products"
  }

  static relationMappings = {
    subcategory: {
      relation: Model.BelongsToOneRelation,
      modelClass: Subcategory,
      join: {
        from: 'subcategories.id',
        to: 'products.subcategory_id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: "products.id",
        to: "comments.product_id"
      }
    },
    prices: {
      relation: Model.HasManyRelation,
      modelClass: Price,
      join: {
        from: "products.id",
        to: "prices.product_id"
      }
    },
    favorites: {
      relation: Model.HasManyRelation,
      modelClass: Favorite,
      join: {
        from: "products.id",
        to: "favorites.product_id"
      }
    },
    keywords: {
      relation: Model.HasManyRelation,
      modelClass: Keyword,
      join: {
        from: "products.id",
        to: "keywords.product_id"
      }
    },
    characteristics: {
      relation: Model.HasManyRelation,
      modelClass: Characteristic,
      join: {
        from: "products.id",
        to: "characteristics.product_id"
      }
    }

  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 64 },
        description: { type: 'string', minLength: 1, maxLength: 512 },
        image_url: { type: 'string' },
        subcategory_id: { type: 'integer' }
      }
    };
  }

}

export default Product;
