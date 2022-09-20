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
    characteristic_values: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "CharacteristicValue"),
      join: {
        from: "characteristic_names.id",
        to: "characteristic_values.characteristic_name_id"
      }
    },
  }

}

export default CharacteristicName;
