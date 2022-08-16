const Model = require("./BaseModel");

class Keyword extends Model {

  static get tableName() {
    return "keywords"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'keyword',
        'product_id',
      ],
      properties: {
        id: { type: 'integer' },
        keyword: { type: 'string', minLength: 1, maxLength: 64 },
        product_id: { type: 'integer' }
      }
    };
  }

}

module.exports = Keyword;