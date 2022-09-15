import Model from "./BaseModel";

class Price extends Model {

  static get tableName() {
    return "prices"
  }

  static get modifiers() {
    return {
      selectLatest(builder: any) {
        builder.select('id', 'price')
          .orderBy('date', "desc")
          .limit(1)
      },
    };
  }

}

export default Price;
