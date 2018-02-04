import {
  IExecute,
  StatsError,
  JoinType,
  TSelect,
  IAggregateFunction as QueryIAggregateFunction,
  StatsWarn
} from './../../../../core/index';

import {
  Select as QuerySelect,
  QueryResult
} from './../../../../query/index';

import { Database } from './../../database/index';
import { Table, Column, Row } from './../../table/index';
import { Where } from './../where/index';
import { IJoin, InnerJoin } from './../join/index';
import { OrderAscending, OrderDescending } from './Order';
import { Distinct } from './../distinct/Distinct';
import { GroupBy } from './GroupBy';
import { Limit } from './Limit';
import { IAggregateFunction } from './../aggregatefunction/IAggregateFunction';
import { ConvertAggregateFunction } from './../aggregatefunction/Convert';

export class Select implements IExecute {
  private _database: Database;
  private _querySelect: QuerySelect;
  private _select: Array<TSelect>;
  private _from: Table;
  private _where: Where;
  private _orderAscending: OrderAscending;
  private _orderDescending: OrderDescending;
  private _distinct: Distinct;
  private _joins: Array<IJoin> = Array<IJoin>();
  private _groupby: GroupBy;
  private _limit: Limit;

  constructor(database: Database, querySelect: QuerySelect) {
    this._database = database;
    this._querySelect = querySelect;

    this._select = querySelect.State()[0];

    if (!querySelect.State()[1]) {
      throw new StatsError(`SELECT: Table not defined!`);
    }

    this._from = this._database.Table(querySelect.State()[1]);

    // SET TABLE
    if (!this._from) {
      throw new StatsError(`SELECT: Table ${querySelect.State()[1].toString()} does not exist in database!`);
    }

    // SET WHERE
    if (querySelect.State()[2]) {
      this._where = new Where(...querySelect.State()[2].State());
    }

    // SET ORDER ASCENDING
    if (querySelect.State()[3]) {
      this._orderAscending = new OrderAscending(...querySelect.State()[3].State());
    }

    // SET ORDER DESCENDING    
    if (querySelect.State()[4]) {
      this._orderDescending = new OrderDescending(...querySelect.State()[4].State());
    }

    // SET DISTINCT
    if (querySelect.State()[5]) {
      this._distinct = new Distinct(...querySelect.State()[5].State());
    }

    // SET JOINS
    if (querySelect.State()[6]) {
      if (querySelect.State()[6].length) {
        querySelect.State()[6].forEach(element => {
          let joinTable = this._database.Table(element.State()[0]);
          if (!joinTable) {
            throw new StatsError(`SELECT Join: Table ${joinTable} does not exist in database!`);
          }
          if (element.JoinType() == JoinType.InnerJoin) {
            this._joins.push(new InnerJoin(joinTable, element.State()[1], element.State()[2]));
          }
        });
      }

    }

    if (querySelect.State()[7]) {
      this._groupby = new GroupBy(querySelect.State()[7].State()[0], querySelect.State()[7].State()[1]);
    }
    if (querySelect.State()[8]) {
      this._limit = new Limit(querySelect.State()[8].State());
    }
  }

  private ExcecuteAgregateFunction(table: Table): Table {
    let queryAggregateFunctions: Array<TSelect> = this._select.filter((value: TSelect) => { return (<QueryIAggregateFunction>value).State !== undefined; });
    let newColumns: Array<Column> = new Array<Column>();

    let newRows: Array<Row> = new Array<Row>();
    let newRow = new Row();

    queryAggregateFunctions.forEach((value: TSelect) => {
      let aggregateFunction: IAggregateFunction = ConvertAggregateFunction.ConvertAggregateFunction(<QueryIAggregateFunction>value);
      let newColumn: Column = new Column(aggregateFunction.ColumnName(), aggregateFunction.DataType());
      newColumns.push(newColumn);
      newRow.Row[aggregateFunction.ColumnName()] = aggregateFunction.ExecuteAggregateFunction(table);
    });

    newRows.push(newRow);

    let newTable: Table = new Table(table.Name).Construct(newColumns, newRows);

    return newTable;
  }

  private ExecuteColumns(table: Table): Table {
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

  private ExecuteSelect(table: Table): Table {
    // SELECT *
    if (this._select.length === 1 && this._select[0] === '*') {
      return table;
    }

    return this.ExecuteColumns(table);
  }

  public Execute(): QueryResult {
    // FROM & JOIN
    // WHERE
    // GROUP BY
    // HAVING
    // SELECT
    // ORDER BY
    // LIMIT

    let resultTable = Object.assign(new Table(this._from.Name), this._from);

    // TODO: CHECK THIS AGAIN
    if (this._distinct) {
      resultTable = this._distinct.ExecuteQuery(resultTable);
    }

    if (this._joins.length) {
      this._joins.forEach(element => {
        resultTable = (<any>element).ExecuteQuery(resultTable);
      });
    }

    if (this._where) {
      resultTable = this._where.ExecuteQuery(resultTable);
    }

    let resultTables: Array<Table>;
    if (this._groupby) {
      resultTables = this._groupby.ExecuteQuery(resultTable);
    }

    // EXECUTE SELECT
    if (this._select) {
      // TODO Functions
      let anyAgregateFunction: boolean = this._select.some((value: TSelect) => { return (<QueryIAggregateFunction>value).State !== undefined; });

      if (anyAgregateFunction) {
        resultTable = this.ExcecuteAgregateFunction(resultTable)
      } else {
        resultTable = this.ExecuteSelect(resultTable);
      }
    }

    if (this._orderAscending) {
      resultTable = this._orderAscending.ExecuteQuery(resultTable);
    }

    if (this._orderDescending) {
      resultTable = this._orderDescending.ExecuteQuery(resultTable);
    }

    if (this._limit) {
      resultTable = this._limit.ExecuteQuery(resultTable);
    }

    return new QueryResult(true, 'Select excecuted succesfully!', resultTable);
  }
}
