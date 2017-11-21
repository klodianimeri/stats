import {
  DatabaseError,
} from './../../../../core/index';

import {
  Column,
  RepresentingType,
  Table,
  Row,
} from './../../index';

export class InnerJoin {
  private _table1: Table;
  private _table1Col: string;
  private _table2: Table;
  private _table2Col: string;

  constructor(joinedTable: Table, table1Col: string, table2Col: string) {
    this._table2 = joinedTable;
    this._table1Col = table1Col;
    this._table2Col = table2Col;
  }

  ExecuteQuery(joinTable: Table): Table {
    if (!joinTable) {
      throw new DatabaseError(`JOIN ERROR: Join table is undefined.`);
    }

    this._table1 = joinTable;

    let table1Column: Column = this._table1.Columns.filter((e) => { return e.Name == this._table1Col })[0];

    if (!table1Column) {
      throw new DatabaseError(`JOIN ERROR: Column ${this._table1Col} does not exist in table.`);
    } else if (!table1Column.IsPrimaryKey) {
      throw new DatabaseError(`JOIN ERROR: Table ${this._table1.Name} column ${table1Column.Name} is not a PrimaryKey.`)
    }

    let table2Column: Column = this._table2.Columns.filter((e) => { return e.Name == this._table2Col })[0];

    if (!table2Column) {
      throw new DatabaseError(`JOIN ERROR: Column ${this._table2Col} does not exist in table.`);
    } else if (!table2Column.IsForeignKey) {
      throw new DatabaseError(`JOIN ERROR: Table ${this._table2.Name} column ${table1Column.Name} is not a ForeignKey.`)
    }

    let newColumns: Array<Column> = new Array<Column>();

    this._table1.Columns.forEach((column) => {
      let newColumn = Object.assign(new Column(), column);
      newColumn.Name = `${this._table1.Name}.${column.Name}`;
      newColumns.push(newColumn);
    });

    this._table2.Columns.forEach((column) => {
      let newColumn = Object.assign(new Column(), column);
      newColumn.Name = `${this._table2.Name}.${column.Name}`;
      newColumns.push(newColumn);
    });

    let newRows: Array<Row> = new Array<Row>();

    this._table1.Data.forEach((table1Row) => {

      let newRow: Row = new Row();

      for (var propertyName in table1Row.Row) {
        newRow.Row[`${this._table1.Name}.${propertyName}`] = table1Row.Row[propertyName];
      }

      let relatedRows = this._table2.Data.filter((table2Row) => { return table1Row.Row[table1Column.Name] == table2Row.Row[table2Column.Name]; });

      relatedRows.forEach((relatedRow) => {

        for (var propertyName in relatedRow.Row) {
          newRow.Row[`${this._table2.Name}.${propertyName}`] = relatedRow.Row[propertyName];
        }

        newRows.push(newRow);
      });

    });

    let newTable: Table = new Table(`join_${this._table1.Name}+${this._table2.Name}`).Construct(newColumns, newRows);

    return newTable;
  }
}
