
import {
  IExecute,
  WhereExpression,
  DatabaseError
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
    this._table = this._database.Table(queryUpdate.State()[0]);

    if (!this._table) {
      throw new DatabaseError(`UPDATE: Table ${queryUpdate.State()[0]} does not exist in database!`)
    }

    this._database = database;

    this._where = new Where(...queryUpdate.State()[1].State());
    this._columnValues = queryUpdate.State()[2];
  }

  ExecuteQuery(table: Table): Table {
    return new Table("todo");
  }

  Execute(): QueryResult {
    return new QueryResult(true);
  }
}
