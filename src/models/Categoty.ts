import Model from "./BaseModel";

class Category extends Model {
  id: number
  name: string
  parent_id: number
  subcategories: []

  static get tableName() {
    return "categories"
  }

  static relationMappings = {
    subcategories: {
      relation: Model.HasManyRelation,
      modelClass: Category,
      join: {
        from: "categories.id",
        to: "categories.parent_id"
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
