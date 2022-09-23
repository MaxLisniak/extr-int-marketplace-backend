import Model from "./BaseModel";
import Product from "./Product";

class User extends Model {
  id: number
  first_name: string
  last_name: string
  password_hash: string
  email: string
  refresh_token: string

  static get tableName() {
    return "users"
  }

  static get modifiers() {
    return {
      defaultSelects(builder: any) {
        builder.select('first_name', 'last_name');
      },
    };
  }
  static relationMappings = {
    favoriteProducts: {
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
