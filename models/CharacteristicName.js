const Model = require("./BaseModel");
const path = require('path')

class CharacteristicName extends Model {

  static get tableName() {
    return "characteristic_names"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 32 },
      }
    };
  }

  static relationMappings = {
    characteristics: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "Characteristic"),
      join: {
        from: "characteristic_names.id",
        to: "characteristics.characteristic_name_id"
      }
    },
  }

}

module.exports = CharacteristicName;