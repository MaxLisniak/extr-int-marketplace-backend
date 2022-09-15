import Model from "./BaseModel";

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

}

export default User;
