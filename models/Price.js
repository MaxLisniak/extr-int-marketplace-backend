const Model = require("./BaseModel");

class Price extends Model {

  static get tableName() {
    return "prices"
  }

}

module.exports = Price;