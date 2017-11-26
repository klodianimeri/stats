import {
  IState
} from './../../index';

export class Distinct implements IState {
  private _distincts: Array<string>;

  constructor(...distincts: Array<string>) {
    this._distincts = distincts;
  }

  public State(): Array<string> {
    return this._distincts;
  }
}
