import Category from "../models/Categoty";
import Characteristic from "../models/Characteristic";
import CharacteristicName from "../models/CharacteristicName";
import Comment from "../models/Comment";
import Favorite from "../models/Favorite";
import Keyword from "../models/Keyword";
import Price from "../models/Price";
import Product from "../models/Product";
import Subcategory from "../models/Subcategory";
import User from "../models/User";

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

export default objects;
