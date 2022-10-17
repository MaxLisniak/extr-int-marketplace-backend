import Model from "./BaseModel";

class Brand extends Model {
  id: number
  name: string

  static get tableName() {
    return "brands"
  }
}

export default Brand;
