const Model = require("./BaseModel");

class Price extends Model {

  static get tableName() {
    return "prices"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'price',
        'date',
        'product_id',
      ],
      properties: {
        id: { type: 'integer' },
        price: { type: 'integer' },
        date: { type: 'string' },
        product_id: { type: 'integer' }
      }
    };
  }

}

module.exports = Price;