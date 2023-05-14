import AttributeValue from "./attribute-values.model";
import Model from "./base.model";
import Category from "./categories.model";
import Comment from "./comments.model";
import Keyword from "./keywords.model";
import path from "path";


class Product extends Model {
  id: number
  name: string
  description: string
  image_url: string
  brand_id: number
  price: number
  attributes: {
    name: string,
    value: string,
    attribute_id: number,
  }[]

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
      modelClass: path.join(__dirname, "products.model"),
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
          from: 'keyword_to_product.product_id',
          to: 'keyword_to_product.keyword_id'
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
          from: 'attribute_to_product.product_id',
          to: 'attribute_to_product.attribute_value_id'
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
          from: 'category_to_product.product_id',
          to: 'category_to_product.category_id'
        },
        to: 'categories.id'
      }
    }
  }
}

export default Product;
