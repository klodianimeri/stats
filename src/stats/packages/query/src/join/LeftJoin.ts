import { Select, IState } from './../../index';
import { IJoin, JoinType } from './../../../core/index';

export class LeftJoin implements IJoin, IState {
    private _select: Select;
    private _table1Col: string;
    private _table2: string;
    private _table2Col: string;

    constructor(select: Select, joinedTable: string) {
        this._select = select;
        this._table2 = joinedTable;
    }

    On(table1Col: string, table2Col: string): Select {
        this._table1Col = table1Col;
        this._table2Col = table2Col;
        return this._select;
    }

    public State(): [string, string, string] {
        return [this._table2, this._table1Col, this._table2Col];
    }

    JoinType(): JoinType {
        return JoinType.LeftJoin;
    }
}
