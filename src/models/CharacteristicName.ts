import Model from "./BaseModel";
import path from "path";

class CharacteristicName extends Model {
  id: number
  name: string
  for_subcategory_id: number

  static get tableName() {
    return "characteristic_names"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 32 },
        for_subcategory_id: { type: 'inyeger' },
      }
    };
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
