import AttributeName from "./AttributeName";
import Model from "./BaseModel";
// import AttributeName from "./AttributeName";

class AttributeValue extends Model {
  id: number
  value: string
  // product_id: number
  // characteristic_name_id: number

  static get tableName() {
    return "attribute_values"
  }

  static relationMappings = {
    attribute_name: {
      relation: Model.HasOneThroughRelation,
      modelClass: AttributeName,
      join: {
        from: 'attribute_values.id',
        through: {
          from: 'attribute_pairs.attribute_value_id',
          to: 'attribute_pairs.attribute_name_id'
        },
        to: 'attribute_names.id'
      }
    }
  }
}

export default AttributeValue;
