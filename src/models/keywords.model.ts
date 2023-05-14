import Model from "./base.model";
import path from "path";

class Keyword extends Model {
  id: number
  product_id: number
  keyword: string

  static get tableName() {
    return "keywords"
  }

  static relationMappings = {
    products: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "products.model"),
      join: {
        from: 'products.id',
        through: {
          from: 'keyword_to_product.keyword_id',
          to: 'keyword_to_product.product_id',
        },
        to: 'keywords.id'
      }
    }
  };

}

export default Keyword;
