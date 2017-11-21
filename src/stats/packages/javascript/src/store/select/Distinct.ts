import {
  Table,
  Row
} from './../../table/index';

export class Distinct {
  private _distincts: Array<string>;

  constructor(...distincts: Array<string>) {
    this._distincts = distincts;
  }


  ExecuteQuery(input: Table): Table {
    let newTable: Table = Object.assign(new Table(input.Name), input);

    this._distincts.forEach((distinct, index) => {
      let flags = {};
      newTable.Data = newTable.Data.filter((entry: Row) => {
        if (flags[entry.Row[distinct]]) {
          return false;
        }
        flags[entry.Row[distinct]] = true;
        return true;
      });
    });

    return newTable;
  }

}
