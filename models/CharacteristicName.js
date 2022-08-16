const Model = require("./BaseModel");

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

}

module.exports = CharacteristicName;