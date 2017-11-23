import {
    StatsError, StatsWarn
} from './../../../../core/index';

import {
    Table,
    Row
} from './../../table/index';

export class Limit {
    private _limit: number;

    constructor(limit: number) {
        this._limit = limit;
    }


    ExecuteQuery(input: Table): Table {

        if (this._limit < 0) {
            throw new StatsError("LIMIT: Value given is negative!");
        }

        if (this._limit >= input.Data.length) {
            new StatsWarn("LIMIT: Limit give out of range!");
            return input;
        }

        input.Data = input.Data.slice(0, this._limit);

        return input;
    }

}
