import { Table, Column } from "./../index";

export class Relationship {
    private _relationshipId: string;
    private _table: Table;
    private _tableOn: Table;
    private _tableOnColumn: Column;

    constructor(table: Table, tableOn: Table, tableOnColumn: Column) {
        this._relationshipId = "foreignkey_" + table.Name + "_" + tableOn.Name + "_on_" + tableOnColumn.Name;
        this._table = table;
        this._tableOn = tableOn;
        this._tableOnColumn = tableOnColumn;
    }
}