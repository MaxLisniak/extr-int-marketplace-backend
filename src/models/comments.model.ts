import Model from "./base.model";
import path from "path";


class Comment extends Model {
  id: number
  text: string
  created: string
  user_id: number
  product_id: number
  rating: number

  static get tableName() {
    return "comments"
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "users.model"),
      join: {
        from: 'users.id',
        to: 'comments.user_id'
      }
    },
  }

}

export default Comment;
