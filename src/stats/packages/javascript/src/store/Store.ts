import { IStore } from './../../../core/index';

import {
  Database,
  Table,
  Insert,
  Select,
  Delete,
  Update
} from './../index';

import {
  QueryResult,
  Select as QuerySelect,
  Insert as QueryInsert,
  Update as QueryUpdate,
  Delete as QueryDelete
} from './../../../query/index';

export class Store implements IStore {
  private _database: Database;

  constructor(name: string, ...tables: Array<Table>) {
    this._database = new Database(name, ...tables);
  }

  Insert(queryInsert: QueryInsert): QueryResult {
    return new Insert(this._database, queryInsert).Execute();
  }

  Select(querySelect: QuerySelect): QueryResult {
    return new Select(this._database, querySelect).Execute();
  }

  Delete(queryDelete: QueryDelete): QueryResult {
    return new Delete(this._database, queryDelete).Execute();
  }

  Update(queryUpdate: QueryUpdate): QueryResult {
    return new Update(this._database, queryUpdate).Execute();
  }
}
