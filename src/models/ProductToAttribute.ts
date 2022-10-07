import Model from "./BaseModel";

class ProductToAttribute extends Model {
  id: number
  product_id: number
  attribute_value_id: number

  static get tableName() {
    return "product_to_attribute"
  }
}

export default ProductToAttribute;
