import Model from "./BaseModel";
import CharacteristicName from "./CharacteristicName";

class CharacteristicValue extends Model {
  id: number
  name: string
  product_id: number
  characteristic_name_id: number

  static get tableName() {
    return "characteristic_values"
  }

  static relationMappings = {
    characteristic_name: {
      relation: Model.BelongsToOneRelation,
      modelClass: CharacteristicName,
      join: {
        from: 'characteristic_names.id',
        to: 'characteristic_values.characteristic_name_id'
      }
    },
  }

  static get modifiers() {
    return {
      defaultSelects(builder: any) {
        builder.select('id', 'value', 'characteristic_name_id', 'product_id');
      },
      onlyUniqueValues(builder: any) {
        builder.groupBy('value')
      }
    };
  }

}

export default CharacteristicValue;
