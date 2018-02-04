import { IAggregateFunction } from './../../../core/index';

export class Min implements IAggregateFunction {
    private _columnName: string;
    private _distinct: boolean;
    private _alias: string;

    constructor(columnName: string) {
        this._columnName = columnName;
    }

    Distinct(): IAggregateFunction {
        this._distinct = true;
        return this;
    }

    As(alias: string): IAggregateFunction {
        this._alias = alias;
        return this;
    }

    State(): [string, boolean, string] {
        return [this._columnName, this._distinct, this._alias];
    }
}
