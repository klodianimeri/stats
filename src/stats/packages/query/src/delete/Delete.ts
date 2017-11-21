import { Where, IState, WhereExpression } from './../index';

export class Delete implements IState {
  private _into: string;
  private _where: Where;

  constructor() {
  }

  public From(table: string): Delete {
    this._into = table;
    return this;
  }

  public Where(...wheres: Array<WhereExpression>): Delete {
    this._where = new Where(...wheres);
    return this;
  }

  public State(): [string, Where] {
    return [this._into, this._where];
  }
}
