import { Table } from "../../table/Table";
import { DataType } from "../../table/DataType";

export interface IAggregateFunction {
    ExecuteAggregateFunction(input: Table): any;
    ColumnName(): string;
    DataType(): DataType;
}