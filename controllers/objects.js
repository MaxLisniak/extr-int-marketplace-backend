const Category = require("../models/Categoty");
const Characteristic = require("../models/Characteristic");
const CharacteristicName = require("../models/CharacteristicName");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorite");
const Keyword = require("../models/Keyword");
const Price = require("../models/Price");
const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory");
const User = require("../models/User");

const objects = {
  "categories": Category,
  "characteristics": Characteristic,
  "characteristic_names": CharacteristicName,
  "comments": Comment,
  "favorites": Favorite,
  "keywords": Keyword,
  "prices": Price,
  "products": Product,
  "subcategories": Subcategory,
  "users": User
}

module.exports = objects;