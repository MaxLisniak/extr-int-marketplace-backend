import Model from "./BaseModel";
// import path from "path";

class AttributeName extends Model {
  id: number
  name: string

  static get tableName() {
    return "attribute_names"
  }
}

export default AttributeName;
