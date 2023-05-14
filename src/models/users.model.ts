import Model from "./base.model";
import Product from "./products.model";

class User extends Model {
  id: number
  first_name: string
  last_name: string
  password_hash: string
  email: string
  refresh_token: string
  is_admin: boolean

  static get tableName() {
    return "users"
  }

  static relationMappings = {
    favorite_products: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: 'users.id',
        through: {
          from: 'favorites.user_id',
          to: 'favorites.product_id'
        },
        to: 'products.id'
      }
    }
  };
}

export default User;
