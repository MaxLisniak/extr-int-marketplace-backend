import Model from "./BaseModel";

class Category extends Model {
  parent_id: number
  name: string
  id: number
  subcategories: Category[]

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

}

export default Category;
