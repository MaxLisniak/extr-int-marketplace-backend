import Model from "./BaseModel";
import User from "./User";


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
      defaultSelects(builder: any) {
        builder.select('text', 'created');
      },
    };
  }

}

export default Comment;
