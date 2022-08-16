const Model = require("./BaseModel");

class User extends Model {

  static get tableName() {
    return "users"
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('first_name', 'last_name');
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name'],
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 32 },
        last_name: { type: 'string', minLength: 1, maxLength: 32 },
      }
    };
  }

}

module.exports = User;