import Model from "./base.model";

class Brand extends Model {
  id: number
  name: string

  static get tableName() {
    return "brands"
  }
}

export default Brand;
