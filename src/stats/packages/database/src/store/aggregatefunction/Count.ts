import { StatsError } from '../../../../core/index';
import { IAggregateFunction } from './IAggregateFunction';
import { Table } from "../../table/Table";
import { DataType, RepresentingType } from '../../table/DataType';
import { Column } from '../../table/Column';
import { Distinct } from './../distinct/Distinct';

export class Count implements IAggregateFunction {
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
            throw new StatsError(`AGGREGATE FUNCTION COUNT: Column ${this._columnName} does not exist on table ${table.Name}!`);
        }

        if (this._distinct) {
            table = new Distinct(this._columnName).ExecuteQuery(table);
        }

        let count = table.Data.reduce((p, c) => {
            if (c.Row[this._columnName]) {
                return p + 1;
            }
            return p;
        }, 0);

        return count;
    }

    public ColumnName(): string {
        if (this._alias) {
            return this._alias;
        }

        return `Count_${this._columnName}`;
    }

    public DataType(): DataType {
        return DataType.Integer;
    }
}