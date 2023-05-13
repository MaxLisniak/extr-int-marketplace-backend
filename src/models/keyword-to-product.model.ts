import Model from "./base.model";

class KeywordToProduct extends Model {
  id: number
  product_id: number
  keyword_id: number

  static get tableName() {
    return "keyword_to_product"
  }
}

export default KeywordToProduct;
