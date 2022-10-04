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

  // static relationMappings = {
  //   characteristic_name: {
  //     relation: Model.BelongsToOneRelation,
  //     modelClass: AttributeName,
  //     join: {
  //       from: 'characteristic_names.id',
  //       to: 'attribute_values.characteristic_name_id'
  //     }
  //   },
  // }

  // static get modifiers() {
  //   return {
  //     defaultSelects(builder: any) {
  //       builder.select('id', 'value', 'characteristic_name_id', 'product_id');
  //     },
  //     onlyUniqueValues(builder: any) {
  //       builder.groupBy('value')
  //     }
  //   };
  // }

}

export default AttributeValue;
