const Model = require("./BaseModel");

class CharacteristicName extends Model {

  static get tableName() {
    return "characteristic_names"
  }

}

module.exports = CharacteristicName;