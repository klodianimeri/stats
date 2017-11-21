import {
  IExecute,
  DatabaseError,
  WhereExpression
} from './../../../../core/index';

import {
  Database,
  Table,
  Row,
  Where
} from './../../index';

import {
  Delete as QueryDelete,
  QueryResult
} from './../../../../query/index';

export class Delete implements IExecute {
  private _database: Database;
  private _into: Table;
  private _where: Where;


  constructor(database: Database, queryDelete: QueryDelete) {
    this._database = database;
    this._into = this._database.Table(queryDelete.State()[0]);

    if (!this._into) {
      throw new DatabaseError(`DELETE: Table ${queryDelete.State()[0]} does not exist in database!`);
    }

    this._where = new Where(...queryDelete.State()[1].State());
  }

  public Execute(): QueryResult {

    if (!this._where) {
      this._into.Data = new Array<Row>();
      return new QueryResult(true, 'Rows deleted successfully!', this._into);
    }

    let toRemoveTable: Table = this._where.ExecuteQuery(this._into);

    toRemoveTable.Data.forEach((row, index, self) => {
      let indexOfRow: number = this._into.Data.indexOf(row);
      if (indexOfRow !== -1) {
        this._into.Data.splice(indexOfRow, 1);
      }
    })

    return new QueryResult(true, 'Rows deleted successfully!', this._into);
  }
}
