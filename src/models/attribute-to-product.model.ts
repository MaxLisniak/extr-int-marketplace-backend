import Model from "./base.model";

class AttributeToProduct extends Model {
  id: number
  product_id: number
  attribute_value_id: number

  static get tableName() {
    return "attribute_to_product"
  }
}

export default AttributeToProduct;
