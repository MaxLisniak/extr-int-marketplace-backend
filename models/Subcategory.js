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

}

module.exports = Subcategory;