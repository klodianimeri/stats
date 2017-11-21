import {
  Column,
  RepresentingType,
  Table,
  Row
} from './../../index';


export class OrderBase {
  public static Compare(a: Object, b: Object, property: Column): number {
    switch (property.RepresentingType) {
      case RepresentingType.Boolean:
        if (a[property.Name] == true && b[property.Name] == true) return 0;
        if (a[property.Name] == true && b[property.Name] == false) return 1;
        if (a[property.Name] == false && b[property.Name] == true) return -1;
        break;

      case RepresentingType.String:
        return a[property.Name].localeCompare(b[property.Name]);
      case RepresentingType.Array:
      case RepresentingType.Object:
        return 0;


      default:
        if (a[property.Name] == b[property.Name]) return 0;
        if (a[property.Name] > b[property.Name]) return 1;
        if (a[property.Name] < b[property.Name]) return -1;
        break;
    }
  }
}


export class OrderAscending {
  private _orders: Array<string>;

  constructor(...orders: Array<string>) {
    this._orders = orders;
  }


  ExecuteQuery(input: Table): Table {

    let newTable: Table = Object.assign(new Table(input.Name), input);

    this._orders.forEach((orderName, index) => {
      let filteredColumns = newTable.Columns.filter((e) => { return e.Name == orderName; });
      if (filteredColumns.length > 0) {
        newTable.Data.sort((a: Row, b: Row) => {
          return OrderBase.Compare(a, b, filteredColumns[0]);
        });
      }
    });

    return newTable;
  }

}

export class OrderDescending {
  private _orders: Array<string>;

  constructor(...orders: Array<string>) {
    this._orders = orders;
  }


  ExecuteQuery(input: Table): Table {

    let newTable: Table = Object.assign(new Table(input.Name), input);

    this._orders.forEach((orderName, index) => {
      let filteredColumns = newTable.Columns.filter((e) => { return e.Name == orderName; });
      if (filteredColumns.length > 0) {
        newTable.Data.sort((a: Row, b: Row) => {
          return -OrderBase.Compare(a.Row, b.Row, filteredColumns[0]);
        });
      }
    });

    return newTable;
  }

}
