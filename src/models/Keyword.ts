import Model from "./BaseModel";
import path from "path";

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
      modelClass: path.join(__dirname, "Product"),
      join: {
        from: 'products.id',
        to: 'keywords.product_id'
      }
    },
  }

}

export default Keyword;
