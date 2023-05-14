import Model from "./base.model";

class CategoryToProduct extends Model {
  id: number
  product_id: number
  category_id: number

  static get tableName() {
    return "category_to_product"
  }
}

export default CategoryToProduct;
