
import {
  WhereExpression
} from './../../../../core/index';

import {
  Column,
  Table,
  Row
} from './../../table/index';

export class Where {
  private _wheres: Array<WhereExpression>;

  constructor(...wheres: Array<WhereExpression>) {
    this._wheres = wheres;
  }

  ExecuteQuery(input: Table): Table {

    let newColumns: Array<Column> = Object.assign(new Array<Column>(), input.Columns);

    let newRows: Array<Row> = new Array<Row>();

    input.Data.forEach((row, index) => {
      let pass: boolean = true;

      this._wheres.forEach((whereExpression, index) => {
        pass = whereExpression.CompareBooleanOperator(row.Row, pass);
      });

      if (pass) { newRows.push(row); }
    });

    let newTable: Table = new Table(input.Name).Construct(newColumns, newRows);

    return newTable;
  }
}

