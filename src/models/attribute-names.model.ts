import Model from "./base.model";

class AttributeName extends Model {
  id: number
  name: string

  static get tableName() {
    return "attribute_names"
  }
}

export default AttributeName;
