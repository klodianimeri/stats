import {
  QueryResult
} from './../QueryResult';

import {
  IState
} from './../IState';

import {
  Where,
  WhereExpression
} from './../where/index';

export class Update implements IState {
  private _table: string;
  private _where: Where;
  private _columnValues: Array<[string, any]>;

  constructor() {
  }

  public Update(table: string) {
    this._table = table;
  }

  public Set(...columnValues: Array<[string, any]>): Update {
    this._columnValues = columnValues;
    return this;
  }


  public Where(...wheres: Array<WhereExpression>): Update {
    this._where = new Where(...wheres);
    return this;
  }

  public State(): [string, Where, Array<[string, any]>] {
    return [this._table, this._where, this._columnValues];
  }
}
