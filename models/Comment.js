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

}

module.exports = Comment;