import {
    IState
} from './../../index';

export class Limit implements IState {
    private _limit: number;

    constructor(limit: number) {
        this._limit = limit;
    }

    public State(): number {
        return this._limit;
    }
}
