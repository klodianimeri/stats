import {
  IExecute,
  StatsError,
  StatsWarn
} from './../../../../core/index';

import {
  Database
} from './../../database/index';

import {
  Table,
  Row
} from './../../table/index';

import {
  QueryResult,
  Insert as QueryInsert
} from './../../../../query/index';

export class Insert implements IExecute {
  private _database: Database;
  private _into: Table;
  private _columns: Array<string>;
  private _values: Array<any>;

  constructor(database: Database, queryInsert: QueryInsert) {
    this._database = database;
    this._into = this._database.Table(queryInsert.State()[0]);

    if (!this._into) {
      throw new StatsError(`INSERT: Table ${queryInsert.State()[0]} does not exist!`);
    }

    this._columns = queryInsert.State()[1];
    this._values = queryInsert.State()[2];
  }

  public Execute(): QueryResult {
    let newRow = new Row();
    let newRowInsert: boolean = true;

    // Check if primary colum exists in the new insert
    let primaryKeyColumn = this._into.Columns.find((column) => { return column.IsPrimaryKey === true });
    if (primaryKeyColumn && this._columns.indexOf(primaryKeyColumn.Name) == -1) {
      new StatsError(`INSERT: Primary Key Column does not exist in insert data!`);
      newRowInsert = false;
    }

    // Insert the row
    if (newRowInsert) {
      this._columns.forEach((columnName, index) => {

        let columnInsert = this._into.Columns.find((column) => { return column.Name === columnName; });

        if (columnInsert) {
          newRow.Row[columnName] = this._values[index];
        } else {
          newRowInsert = false;
          new StatsError(`INSERT: Column name ${columnName} does not exist in table ${this._into.Name}!`);
        }

        if (columnInsert.IsPrimaryKey) {
          let filteredValueRows = this._into.Data.filter((value) => { return value.Row[columnName] === this._values[columnInsert.Name]; });
          if (filteredValueRows.length > 0) {
            newRowInsert = false;
            new StatsWarn(`INSERT: Primary key ${this._into.Name}.${columnName} value ${this._values[columnInsert.Name]} constraint violation!`);
          }
        }

        newRowInsert = newRowInsert && columnInsert.ProcessRowForInsert(newRow);

      });
    }

    if (newRowInsert) {
      this._into.Data.push(newRow);
    }

    return new QueryResult(true, 'Row inserted successfully!');
  }
}
