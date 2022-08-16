const Model = require("./BaseModel");
const Category = require("./Categoty");

class Subcategory extends Model {

  static get tableName() {
    return "subcategories"
  }

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: 'categories.id',
        to: 'subcategories.category_id'
      }
    }
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('name');
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'category_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 32 },
        category_id: { type: 'integer' }
      }
    };
  }

}

module.exports = Subcategory;