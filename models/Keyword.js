const Model = require("./BaseModel");

class Keyword extends Model {

  static get tableName() {
    return "keywords"
  }

}

module.exports = Keyword;