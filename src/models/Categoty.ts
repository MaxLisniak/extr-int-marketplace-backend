import Model from "./BaseModel";
import path from 'path';
// const Subcategory = require("./Subcategory");

class Category extends Model {

  static get tableName() {
    return "categories"
  }

  static relationMappings = {
    subcategories: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'Subcategory'),
      join: {
        from: "categories.id",
        to: "subcategories.category_id"
      }
    }
  }

  static get modifiers() {
    return {
      defaultSelects(builder: any) {
        builder.select('name');
      },
    };
  }

}

export default Category;
