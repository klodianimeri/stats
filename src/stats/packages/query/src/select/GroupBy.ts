import { HavingExpression } from './../../../core/index';

import {
    IState,
    Select
} from './../../index';

export class GroupBy implements IState {
    private _havings: Array<HavingExpression>;
    private _groupby: Array<string>;

    constructor(...groupby: Array<string>) {
        this._groupby = groupby;
    }

    Having(...havings: Array<HavingExpression>) {
        this._havings = havings;
    }

    public State(): [Array<string>, Array<HavingExpression>] {
        return [this._groupby, this._havings]
    }
}
