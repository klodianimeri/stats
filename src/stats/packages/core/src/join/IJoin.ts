import { JoinType } from './JoinType';

export interface IJoin {
    On(table1Col: string, table2Col: string);
    JoinType(): JoinType;
    State(): [string, string, string];
}
