import Model from "./BaseModel";

class ProductToAttribute extends Model {
  id: number
  product_id: number
  category_id: number

  static get tableName() {
    return "product_to_category"
  }
}

export default ProductToAttribute;
