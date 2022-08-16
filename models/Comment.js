const Model = require("./BaseModel");
const User = require("./User");


class Comment extends Model {

  static get tableName() {
    return "comments"
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'comments.user_id'
      }
    },
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('text', 'created');
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'text',
        'created',
        'user_id',
        'product_id',
      ],
      properties: {
        id: { type: 'integer' },
        text: { type: 'string', minLength: 1, maxLength: 512 },
        created: { type: 'string' },
        user_id: { type: 'integer' },
        product_id: { type: 'integer' }
      }
    };
  }

}

module.exports = Comment;