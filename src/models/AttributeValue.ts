import AttributeName from "./AttributeName";
import Model from "./BaseModel";

class AttributeValue extends Model {
  id: number
  value: string
  attribute_name_id: number

  static get tableName() {
    return "attribute_values"
  }

  static relationMappings = {
    attribute_name: {
      relation: Model.BelongsToOneRelation,
      modelClass: AttributeName,
      join: {
        from: 'attribute_names.id',
        to: 'attribute_values.attribute_name_id'
      }
    }
  }
}

export default AttributeValue;
