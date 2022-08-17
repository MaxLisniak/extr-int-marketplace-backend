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

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('id', 'value');
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'value',
        'characteristic_name_id',
        'product_id'
      ],
      properties: {
        id: { type: 'integer' },
        value: { type: 'string', minLength: 1, maxLength: 64 },
        characteristic_name_id: { type: 'integer' },
        product_id: { type: 'integer' }
      }
    };
  }



}

module.exports = Characteristic;