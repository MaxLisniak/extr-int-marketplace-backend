import AttributeValue from "./AttributeValue";
import Model from "./BaseModel";
import Category from "./Categoty";
import Comment from "./Comment";
import Keyword from "./Keyword";
import path from "path";


class Product extends Model {
  id: number
  name: string
  description: string
  image_url: string
  brand_id: number
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
      modelClass: path.join(__dirname, "Product"),
      join: {
        from: "products.id",
        to: "favorites.product_id"
      }
    },
    keywords: {
      relation: Model.ManyToManyRelation,
      modelClass: Keyword,
      join: {
        from: 'products.id',
        through: {
          from: 'product_to_keyword.product_id',
          to: 'product_to_keyword.keyword_id'
        },
        to: 'keywords.id'
      }
    },
    attribute_values: {
      relation: Model.ManyToManyRelation,
      modelClass: AttributeValue,
      join: {
        from: 'products.id',
        through: {
          from: 'product_to_attribute.product_id',
          to: 'product_to_attribute.attribute_value_id'
        },
        to: 'attribute_values.id'
      }
    },
    categories: {
      relation: Model.ManyToManyRelation,
      modelClass: Category,
      join: {
        from: 'products.id',
        through: {
          from: 'product_to_category.product_id',
          to: 'product_to_category.category_id'
        },
        to: 'categories.id'
      }
    }
  }
}

export default Product;
