const Model = require("./BaseModel");

class Favorite extends Model {

  static get tableName() {
    return "favorites"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_id',
        'product_id',
      ],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        product_id: { type: 'integer' }
      }
    };
  }

}

module.exports = Favorite;