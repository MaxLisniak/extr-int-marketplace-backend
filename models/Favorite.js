const Model = require("./BaseModel");

class Favorite extends Model {

  static get tableName() {
    return "favorites"
  }

}

module.exports = Favorite;