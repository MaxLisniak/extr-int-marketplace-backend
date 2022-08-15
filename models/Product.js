const Model = require("./BaseModel");
const Characteristic = require("./Characteristic");
const Comment = require("./Comment");
const Favorite = require("./Favorite");
const Keyword = require("./Keyword");
const Price = require("./Price");
const Subcategory = require("./Subcategory");

class Product extends Model {

  static get tableName() {
    return "products"
  }

  static relationMappings = {
    subcategory: {
      relation: Model.BelongsToOneRelation,
      modelClass: Subcategory,
      join: {
        from: 'subcategories.id',
        to: 'products.subcategory_id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: "products.id",
        to: "comments.product_id"
      }
    },
    prices: {
      relation: Model.HasManyRelation,
      modelClass: Price,
      join: {
        from: "products.id",
        to: "prices.product_id"
      }
    },
    favorites: {
      relation: Model.HasManyRelation,
      modelClass: Favorite,
      join: {
        from: "products.id",
        to: "favorites.product_id"
      }
    },
    keywords: {
      relation: Model.HasManyRelation,
      modelClass: Keyword,
      join: {
        from: "products.id",
        to: "keywords.product_id"
      }
    },
    characteristics: {
      relation: Model.HasManyRelation,
      modelClass: Characteristic,
      join: {
        from: "products.id",
        to: "characteristics.product_id"
      }
    }

  }

}

module.exports = Product;