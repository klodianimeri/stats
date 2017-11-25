import { IFunction } from './../../../core/index';

export class Avg implements IFunction {
    private _columnName: string;
    private _distinct: boolean;
    private _alias: string;

    constructor(columnName: string) {
        this._columnName = columnName;
    }

    Distinct(): IFunction {
        this._distinct = true;
        return this;
    }

    As(alias: string): IFunction {
        this._alias;
        return this;
    }

    State(): [string, boolean, string] {
        return [this._columnName, this._distinct, this._alias];
    }
}