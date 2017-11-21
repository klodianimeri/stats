import {
  IExecute,
  DatabaseError
} from './../../../../core/index';

import {
  Select as QuerySelect,
  QueryResult
} from './../../../../query/index';

import { Database } from './../../database/index';
import {
  Table,
  Column,
  Row,
} from './../../table/index';

import { Where } from './../where/index';
import { InnerJoin } from './../join/index';

import {
  OrderAscending,
  OrderDescending
} from './Order';

import {
  Distinct
} from './Distinct';

export class Select implements IExecute {
  private _database: Database;
  private _querySelect: QuerySelect;
  private _select: Array<string>;
  private _from: Table;
  private _where: Where;
  private _orderAscending: OrderAscending;
  private _orderDescending: OrderDescending;
  private _distinct: Distinct;
  private _innerJoin: InnerJoin;

  constructor(database: Database, querySelect: QuerySelect) {
    this._database = database;
    this._querySelect = querySelect;

    this._select = querySelect.State()[0];

    if (!querySelect.State()[1]) {
      throw new DatabaseError(`SELECT: Table not defined!`);
    }

    this._from = this._database.Table(querySelect.State()[1]);

    if (!this._from) {
      throw new DatabaseError(`SELECT: Table ${querySelect.State()[1].toString()} does not exist in database!`);
    }

    if (querySelect.State()[2]) {
      this._where = new Where(...querySelect.State()[2].State());
    }
    if (querySelect.State()[3]) {
      this._orderAscending = new OrderAscending(...querySelect.State()[3].State());
    }

    if (querySelect.State()[4]) {
      this._orderDescending = new OrderDescending(...querySelect.State()[4].State());
    }

    if (querySelect.State()[5]) {
      this._distinct = new Distinct(...querySelect.State()[5].State());
    }

    if (querySelect.State()[6]) {
      let innerJoinTable = this._database.Table(querySelect.State()[6].State()[0]);
      if (!innerJoinTable) {
        throw new DatabaseError(`SELECT Inner Join: Table ${innerJoinTable} does not exist in database!`);
      }
      this._innerJoin = new InnerJoin(innerJoinTable, querySelect.State()[6].State()[1], querySelect.State()[6].State()[2]);
    }
  }

  private ExecuteSelect(table: Table): Table {
    // SELECT *
    if (this._select.length === 1 && this._select[0] === '*') {
      return table;
    }

    let newColumns: Array<Column> = new Array<Column>();

    table.Columns.forEach((column, index) => {
      if (this._select.indexOf(column.Name) !== -1) {
        let newColumn: Column = Object.assign(new Column(), column);

        newColumns.push(newColumn);
      };
    });

    let newRows: Array<Row> = new Array<Row>();

    table.Data.forEach((row, index) => {
      let newRow = new Row();

      newColumns.forEach((column, index) => {

        newRow.Row[column.Name] = row.Row[column.Name];

      });

      if (Object.keys(newRow.Row).length > 0) {
        newRows.push(newRow);
      }
    });

    let newTable: Table = new Table(table.Name).Construct(newColumns, newRows);

    return newTable;
  }

  public Execute(): QueryResult {
    let resultTable = Object.assign(new Table(this._from.Name), this._from);

    if (this._distinct) {
      resultTable = this._distinct.ExecuteQuery(resultTable);
    }

    if (this._where) {
      resultTable = this._where.ExecuteQuery(resultTable);
    }

    if (this._innerJoin) {
      resultTable = this._innerJoin.ExecuteQuery(resultTable);
    }

    if (this._orderAscending) {
      resultTable = this._orderAscending.ExecuteQuery(resultTable);
    }

    if (this._orderDescending) {
      resultTable = this._orderDescending.ExecuteQuery(resultTable);
    }

    return new QueryResult(true, 'Select excecuted succesfully!', this.ExecuteSelect(resultTable));
  }
}
