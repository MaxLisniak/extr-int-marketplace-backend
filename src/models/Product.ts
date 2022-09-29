import Model from "./BaseModel";
import CharacteristicValue from "./CharacteristicValue";
import Comment from "./Comment";
import Favorite from "./Favorite";
import Keyword from "./Keyword";

class Product extends Model {
  id: number
  name: string
  description: string
  image_url: string
  category_id: number
  price: number

  static get tableName() {
    return "products"
  }

  static relationMappings = {

    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: "products.id",
        to: "comments.product_id"
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
    characteristic_values: {
      relation: Model.HasManyRelation,
      modelClass: CharacteristicValue,
      join: {
        from: "products.id",
        to: "characteristic_values.product_id"
      }
    }

  }

}

export default Product;
