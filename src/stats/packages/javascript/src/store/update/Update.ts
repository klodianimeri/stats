
import {
  IExecute,
  WhereExpression,
  StatsError,
  StatsWarn
} from './../../../../core/index';

import { Database } from './../../database/index';

import {
  Table,
  Row
} from './../../table/index';

import { Where } from './../where/index';

import {
  QueryResult,
  Update as QueryUpdate
} from './../../../../query/index';

export class Update implements IExecute {
  private _database: Database;
  private _table: Table;
  private _where: Where;
  private _columnValues: Array<[string, any]>;

  constructor(database: Database, queryUpdate: QueryUpdate) {
    this._database = database;
    this._table = this._database.Table(queryUpdate.State()[0]);

    if (!this._table) {
      throw new StatsError(`UPDATE: Table ${queryUpdate.State()[0]} does not exist in database!`)
    }

    if (queryUpdate.State()[1]) {
      this._where = new Where(...queryUpdate.State()[1].State());
    }
    this._columnValues = queryUpdate.State()[2];
  }

  Execute(): QueryResult {
    //TODO Remove columns that do not exist in table.
    let columnValues: Array<[string, any]> = new Array<[string, any]>();

    this._columnValues.forEach((element, index) => {
      let existsAsColumn: boolean = this._table.Columns.some((value, index) => {
        return value.Name.toLowerCase() === element[0].toLowerCase();
      });
      if (existsAsColumn) {
        columnValues.push(element);
      }
    });

    if (columnValues.length === 0) {
      let failedResult = new QueryResult(true, 'No rows updated!', null, new StatsWarn(`UPDATE: No column name exists in table!`));
      return failedResult;
    }

    let tableToEdit: Table = this._table;

    if (this._where) {
      tableToEdit = this._where.ExecuteQuery(this._table);
    }

    tableToEdit.Data.forEach((row: Row) => {
      let rowIndex: number = this._table.Data.indexOf(row);

      if (rowIndex != -1) {
        this._columnValues.forEach(([property, value]) => {
          if ((<Object>this._table.Data[rowIndex].Row).hasOwnProperty(property)) {
            (<Object>this._table.Data[rowIndex].Row)[property] = value;
          }
        });
      }

    });

    let failedResult = new QueryResult(true, 'Update executed succesfully!');
    return failedResult;
  }
}
