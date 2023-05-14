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
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "products.model"),
      join: {
        from: 'products.id',
        to: 'keywords.product_id'
      }
    },
  }

}

export default Keyword;
