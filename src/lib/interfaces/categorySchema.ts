export interface categorySchema {
  id: number,
  parent_id: number,
  name: string,
  subcategories: categorySchema[]
}