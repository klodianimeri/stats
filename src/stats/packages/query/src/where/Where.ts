import { WhereExpression } from './../../../core/index';

import {
  IState
} from './../../index';

export class Where implements IState {
  private _wheres: Array<WhereExpression>;

  constructor(...wheres: Array<WhereExpression>) {
    this._wheres = wheres;
  }

  public State(): Array<WhereExpression> {
    return this._wheres;
  }
}
