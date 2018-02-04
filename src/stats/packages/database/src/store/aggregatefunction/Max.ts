import { StatsError } from '../../../../core/index';
import { Column } from '../../table/Column';
import { Distinct } from './../distinct/Distinct';
import { IAggregateFunction } from './IAggregateFunction';
import { Table } from "../../table/Table";
import { DataType, RepresentingType } from '../../table/DataType';


export class Max implements IAggregateFunction {
    private _columnName: string;
    private _distinct: boolean;
    private _alias: string;

    constructor(columnName: string, distinct: boolean, alias: string) {
        this.Initialize(columnName, distinct, alias);
    }

    private Initialize(columnName: string, distinct: boolean, alias: string) {
        this._columnName = columnName;
        this._distinct = distinct;
        this._alias = alias;
    }

    ExecuteAggregateFunction(table: Table) {
        let column: Column = table.Columns.find((value: Column) => value.Name === this._columnName);

        if (!column) {
            throw new StatsError(`AGGREGATE FUNCTION MAX: Column ${this._columnName} does not exist on table ${table.Name}!`);
        }

        if (!(column.RepresentingType == RepresentingType.Number)) {
            throw new StatsError(`AGGREGATE FUNCTION AVG: Can not execute Avarage on non number type!`);
        }

        if (this._distinct) {
            table = new Distinct(this._columnName).ExecuteQuery(table);
        }

        let min = table.Data.reduce((p, c) => {
            if (c.Row[this._columnName]) {
                return p > c.Row[this._columnName] ? p : c.Row[this._columnName];
            }
            return p;
        }, Number.MIN_SAFE_INTEGER);

        return min;
    }

    public ColumnName(): string {
        if (this._alias) {
            return this._alias;
        }

        return `Max_${this._columnName}`;
    }

    public DataType(): DataType {
        return DataType.Integer;
    }
}