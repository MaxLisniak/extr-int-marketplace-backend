import Model from "./BaseModel";

class ProductToAttribute extends Model {
  id: number
  product_id: number
  keyword_id: number

  static get tableName() {
    return "product_to_keyword"
  }
}

export default ProductToAttribute;
