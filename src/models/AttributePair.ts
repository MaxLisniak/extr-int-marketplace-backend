import Model from "./BaseModel";

class AttributePair extends Model {
  id: number
  attribute_name_id: number
  attribute_value_id: number
  product_id: number

  static get tableName() {
    return "attribute_pairs"
  }
}

export default AttributePair;
