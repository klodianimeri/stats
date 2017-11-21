import {
  IState
} from './../../index';

export class Insert implements IState {
  private _into: string;
  private _columns: Array<string>;
  private _values: Array<any>;

  constructor() {
  }

  public Insert(...columns: Array<string>): Insert {
    this._columns = columns;
    return this;
  }

  public Into(tableName: string): Insert {
    this._into = tableName;
    return this;
  }

  public Values(...values: Array<any>): Insert {
    this._values = values;
    return this;
  }

  public State(): [string, Array<string>, Array<any>] {
    return [this._into, this._columns, this._values];
  }
}
