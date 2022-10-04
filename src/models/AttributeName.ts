import Model from "./BaseModel";
// import path from "path";

class AttributeName extends Model {
  id: number
  name: string
  // category_id: number

  static get tableName() {
    return "attribute_names"
  }

  // static relationMappings = {
  //   characteristic_values: {
  //     relation: Model.HasManyRelation,
  //     modelClass: path.join(__dirname, "CharacteristicValue"),
  //     join: {
  //       from: "attribute_names.id",
  //       to: "characteristic_values.characteristic_name_id"
  //     }
  //   },
  // }

}

export default AttributeName;
