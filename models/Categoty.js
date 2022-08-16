const Model = require("./BaseModel");

class Category extends Model {

  static get tableName() {
    return "categories"
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
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('name');
      },
    };
  }

}

module.exports = Category;