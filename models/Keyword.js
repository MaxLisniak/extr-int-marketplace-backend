const Model = require("./BaseModel");
const Product = require("./Product");

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

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: 'products.id',
        to: 'keywords.product_id'
      }
    },
  }

}

module.exports = Keyword;