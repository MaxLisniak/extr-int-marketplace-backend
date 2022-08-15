const Model = require("./BaseModel");

class User extends Model {

  static get tableName() {
    return "users"
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('first_name', 'last_name');
      },
    };
  }

}

module.exports = User;