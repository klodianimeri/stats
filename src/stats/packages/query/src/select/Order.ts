import {
  IState
} from './../../index';

export class OrderAscending implements IState {
  private _orders: Array<string>;

  constructor(...orders: Array<string>) {
    this._orders = orders;
  }

  public State(): Array<string> {
    return this._orders;
  }
}

export class OrderDescending implements IState {
  private _orders: Array<string>;

  constructor(...orders: Array<string>) {
    this._orders = orders;
  }

  public State(): Array<string> {
    return this._orders;
  }
}
