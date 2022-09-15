import Model from "./BaseModel";
import CharacteristicName from "./CharacteristicName";

class Characteristic extends Model {

  static get tableName() {
    return "characteristics"
  }

  static relationMappings = {
    characteristic_name: {
      relation: Model.BelongsToOneRelation,
      modelClass: CharacteristicName,
      join: {
        from: 'characteristic_names.id',
        to: 'characteristics.characteristic_name_id'
      }
    },
  }

  static get modifiers() {
    return {
      defaultSelects(builder: any) {
        builder.select('id', 'value', 'characteristic_name_id');
      },
      onlyUniqueValues(builder: any) {
        builder.groupBy('value')
      }
    };
  }

}

export default Characteristic;
