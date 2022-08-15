const Model = require("./BaseModel");

class Category extends Model {

  static get tableName() {
    return "categories"
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