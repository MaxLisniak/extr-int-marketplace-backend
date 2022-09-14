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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name'],
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 32 },
        last_name: { type: 'string', minLength: 1, maxLength: 32 },
        email: { type: 'string', minLength: 1, maxLength: 64 },
      }
    };
  }

}

export default User;
