import { HavingExpression, StatsError } from './../../../../core/index';

import {
    Column,
    RepresentingType,
    Table,
    Row
} from './../../table/index';

import {
    Distinct
} from './../distinct';

export class GroupByTable {
    private _groupByColumn: string;
    private _groupByTableIndex: number;
    private _groupByTable: Table;
    private _childrenGroupByTables: Array<GroupByTable>;

    constructor(groupByColumn: string, groupByTableIndex: number, groupByTable: Table, childrenGroupByTables?: Array<GroupByTable>) {
        this._groupByColumn = groupByColumn;
        this._groupByTableIndex = groupByTableIndex;
        this._groupByTable = groupByTable;
        this._childrenGroupByTables = childrenGroupByTables;
        if (!this._childrenGroupByTables) {
            this._childrenGroupByTables = new Array<GroupByTable>();
        }
    }

    public GroupColumn(): string {
        return this._groupByColumn;
    }

    public GroupByTableIndex(): number {
        return this._groupByTableIndex;
    }

    public GroupByTable(): Table {
        return this._groupByTable;
    }

    public AllTables(): Array<Table> {
        let result: Array<Table> = new Array<Table>();
        this._allTables(result);
        return result;
    }

    private _allTables(allTables: Array<Table>) {
        if (this._groupByTableIndex !== 0) {
            allTables.push(this._groupByTable);
        }

        if (this._childrenGroupByTables.length != 0) {
            this._childrenGroupByTables.forEach(childGroupByTables => {
                childGroupByTables._allTables(allTables);
            });
        }
    }

    public ChildrenGroupByTables(): Array<GroupByTable> {
        return this._childrenGroupByTables;
    }

    public AddChildGroupTable(childGroupTable: GroupByTable) {
        this._childrenGroupByTables.push(childGroupTable);
    }

    public RemoveChildGroupTable(childGroupTable: GroupByTable) {
        this._childrenGroupByTables.splice(this._childrenGroupByTables.indexOf(childGroupTable), 1);
    }

    public GetChildrenGroupByTables(): Array<GroupByTable> {
        return this._childrenGroupByTables;
    }

    public GetAtIndex(index: number): GroupByTable {
        if (this.GroupByTableIndex() === index) {
            return this;
        }

        if (!this._childrenGroupByTables[0]) {
            throw new StatsError(`GROUPBYTABLE: Index ${index} out of range!`);
        }

        return this._childrenGroupByTables[0].GetAtIndex(index);
    }
}

export class GroupBy {
    private _groupby: Array<string>;
    private _havings: Array<HavingExpression>;

    constructor(groupby: Array<string>, havings: Array<HavingExpression>) {
        this._groupby = groupby;
        this._havings = havings;
    }

    ExecuteQuery(input: Table): Array<Table> {

        let columns: Array<Column> = this._groupby.map((groupbyName) => input.Columns.find((value) => value.Name == groupbyName));

        if (columns.length === 0) {
            throw new StatsError(`SELECT GROUP BY: No columns specified in  Group By for table ${input.Name}!`);
        }

        let groupbys: GroupByTable = new GroupByTable(`groupby_root`, 0, input);
        let tempTable: Table = input;

        columns.forEach((column: Column, index: number) => {
            let indexGroupByTable: GroupByTable = groupbys.GetAtIndex(index);

            let distinctColumnValues: Array<any> = new Distinct(column.Name).ExecuteQuery(input).Data.map((row: Row) => {
                return row.Row[column.Name];
            });

            if (index === 0) {
                distinctColumnValues.forEach((distinctColumnValue: any) => {
                    let groupedRows: Array<Row> = indexGroupByTable.GroupByTable().Data.filter((row) => { return row.Row[column.Name] == distinctColumnValue; });

                    let table: Table = new Table(`groupby_${column.Name}`).Construct(Object.assign(new Array<Column>(), input.Columns), groupedRows);

                    indexGroupByTable.AddChildGroupTable(new GroupByTable(`groupby_${column.Name}`, index + 1, table));
                });
            } else {
                let indexGroupByChildrenTables: Array<GroupByTable> = groupbys.GetAtIndex(index - 1).GetChildrenGroupByTables();

                indexGroupByChildrenTables.forEach(indexGroupByChildTable => {
                    distinctColumnValues.forEach((distinctColumnValue: any) => {
                        let groupedRows: Array<Row> = indexGroupByChildTable.GroupByTable().Data.filter((row) => { return row.Row[column.Name] == distinctColumnValue; });

                        if (groupedRows.length != 0) {
                            let table: Table = new Table(`groupby_${column.Name}`).Construct(Object.assign(new Array<Column>(), input.Columns), groupedRows);

                            indexGroupByChildTable.AddChildGroupTable(new GroupByTable(`groupby_${column.Name}`, index + 1, table));
                        }
                    });
                });
            }

        });

        console.log('groupbys: ', groupbys.AllTables());

        //TODO RETURN NORMALISED TABLE
        return groupbys.AllTables();
    }
}
