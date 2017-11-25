import {
    IState,
    Select
} from './../../index';

export class GroupBy implements IState {
    private _select: Select;
    private _groupby: Array<string>;

    constructor(select: Select, ...groupby: Array<string>) {
        this._select = select;
        this._groupby = groupby;
    }

    Having(): Select {
        // this._table1Col = table1Col;
        // this._table2Col = table2Col;
        return this._select;
    }

    public State(): Array<string> {
        return this._groupby;
    }
}
