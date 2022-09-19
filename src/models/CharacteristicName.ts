import Model from "./BaseModel";
import path from "path";

class CharacteristicName extends Model {
  id: number
  name: string
  category_id: number

  static get tableName() {
    return "characteristic_names"
  }

  static relationMappings = {
    characteristics: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "Characteristic"),
      join: {
        from: "characteristic_names.id",
        to: "characteristics.characteristic_name_id"
      }
    },
  }

}

export default CharacteristicName;
