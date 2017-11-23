import { Where } from './../where/index';
import {
  IJoin,
  InnerJoin
} from './../join/index';

import {
  OrderAscending,
  OrderDescending
} from './Order';

import { Limit } from './Limit';
import { Distinct } from './Distinct';
import { IState } from './../IState';
import { WhereExpression } from './../where/WhereExpression';

export class Select implements IState {
  private _select: Array<string>;
  private _from: string;
  private _where: Where;
  private _orderAscending: OrderAscending;
  private _orderDescending: OrderDescending;
  private _distinct: Distinct;
  private _innerJoin: IJoin;
  private _limit: Limit;

  constructor() {
  }

  public Select(...selects: Array<string>): Select {
    this._select = selects;
    return this;
  }

  public Limit(limit: number): Select {
    this._limit = new Limit(limit);
    return this;
  }

  public Distinct(...distincts: Array<string>): Select {
    this._distinct = new Distinct(...distincts);
    return this;
  }

  public Where(...wheres: Array<WhereExpression>): Select {
    this._where = new Where(...wheres);
    return this;
  }

  public From(tableName: string): Select {
    this._from = tableName;
    return this;
  }

  public OrderAscending(...orders: Array<string>): Select {
    this._orderAscending = new OrderAscending(...orders);
    return this;
  }

  public OrderDescending(...orders: Array<string>): Select {
    this._orderDescending = new OrderDescending(...orders);
    return this;
  }

  public InnerJoin(joinTableName: string): IJoin {
    this._innerJoin = new InnerJoin(this, joinTableName);
    return this._innerJoin;
  }

  public State(): [Array<string>, string, Where, OrderAscending, OrderDescending, Distinct, IJoin, Limit] {
    return [this._select, this._from, this._where, this._orderAscending, this._orderDescending, this._distinct, this._innerJoin, this._limit];
  }
}
