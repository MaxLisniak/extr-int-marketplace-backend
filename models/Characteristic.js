const Model = require("./BaseModel");
const CharacteristicName = require("./CharacteristicName");

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

}

module.exports = Characteristic;