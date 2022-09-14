const Model = require("./BaseModel");
const path = require('path');
// const Subcategory = require("./Subcategory");
class Category extends Model {
    static get tableName() {
        return "categories";
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 32 },
            }
        };
    }
    static get modifiers() {
        return {
            defaultSelects(builder) {
                builder.select('name');
            },
        };
    }
}
Category.relationMappings = {
    subcategories: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'Subcategory'),
        join: {
            from: "categories.id",
            to: "subcategories.category_id"
        }
    }
};
module.exports = Category;
//# sourceMappingURL=Categoty.js.map