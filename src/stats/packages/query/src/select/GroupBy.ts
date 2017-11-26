import { GroupByExpression } from './../../../core/index';

import {
    IState,
    Select
} from './../../index';

export class GroupBy implements IState {
    private _havings: Array<GroupByExpression>;
    private _select: Select;
    private _groupby: Array<string>;

    constructor(select: Select, ...groupby: Array<string>) {
        this._select = select;
        this._groupby = groupby;
    }

    Having(...havings: Array<GroupByExpression>): Select {
        this._havings = havings;
        return this._select;
    }

    public State(): Array<string> {
        return this._groupby;
    }
}
