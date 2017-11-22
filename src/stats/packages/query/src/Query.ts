import {
  IStore,
  StatsError
} from './../../core/index';

import { QueryResult } from './QueryResult';
import { Select } from './select/index';
import { Insert } from './insert/index';
import { Delete } from './delete/index';
import { Update } from './update/index';

export class Query {
  private _store: IStore;

  constructor() {
  }

  setStore(store: IStore) {
    this._store = store;
  }

  public Select(s: (selectParam: Select) => Select): QueryResult {
    if (!this._store) {
      throw new StatsError(`QUERY: Store not initialized!`);
    }

    let selectInstance: Select = s(new Select());

    return this._store.Select(selectInstance);
  }

  public Insert(i: (insertParam: Insert) => Insert) {
    if (!this._store) {
      throw new StatsError(`QUERY: Store not initialized!`);
    }

    let insertInstance: Insert = i(new Insert());

    return this._store.Insert(insertInstance);

  }

  public Delete(d: (deleteParam: Delete) => Delete) {
    if (!this._store) {
      throw new StatsError(`QUERY: Store not initialized!`);
    }

    let deleteInstance: Delete = d(new Delete());

    return this._store.Delete(deleteInstance);
  }

  public Update(u: (updateParam: Update) => Update) {
    if (!this._store) {
      throw new StatsError(`QUERY: Store not initialized!`);
    }

    let updateInstance: Update = u(new Update());

    return this._store.Update(updateInstance);
  }
}
