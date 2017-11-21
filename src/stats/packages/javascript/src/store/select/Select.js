"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../../core/index");
var index_2 = require("./../../../../query/index");
var index_3 = require("./../../index");
var Select = /** @class */ (function () {
    function Select(database, querySelect) {
        this._database = database;
        this._querySelect = querySelect;
        this._select = querySelect.State()[0];
        if (!querySelect.State()[1]) {
            throw new index_1.DatabaseError("SELECT: Table not defined!");
        }
        this._from = this._database.Table(querySelect.State()[1]);
        if (!this._from) {
            throw new index_1.DatabaseError("SELECT: Table " + querySelect.State()[1].toString() + " does not exist in database!");
        }
        if (querySelect.State()[2]) {
            this._where = new (index_3.Where.bind.apply(index_3.Where, [void 0].concat(querySelect.State()[2].State())))();
        }
        if (querySelect.State()[3]) {
            this._orderAscending = new (index_3.OrderAscending.bind.apply(index_3.OrderAscending, [void 0].concat(querySelect.State()[3].State())))();
        }
        if (querySelect.State()[4]) {
            this._orderDescending = new (index_3.OrderDescending.bind.apply(index_3.OrderDescending, [void 0].concat(querySelect.State()[4].State())))();
        }
        if (querySelect.State()[5]) {
            this._distinct = new (index_3.Distinct.bind.apply(index_3.Distinct, [void 0].concat(querySelect.State()[5].State())))();
        }
        if (querySelect.State()[6]) {
            var innerJoinTable = this._database.Table(querySelect.State()[6].State()[0]);
            if (!innerJoinTable) {
                throw new index_1.DatabaseError("SELECT Inner Join: Table " + innerJoinTable + " does not exist in database!");
            }
            this._innerJoin = new index_3.InnerJoin(innerJoinTable, querySelect.State()[6].State()[1], querySelect.State()[6].State()[2]);
        }
    }
    Select.prototype.ExecuteSelect = function (table) {
        var _this = this;
        // SELECT *
        if (this._select.length === 1 && this._select[0] === '*') {
            return table;
        }
        var newColumns = new Array();
        table.Columns.forEach(function (column, index) {
            if (_this._select.indexOf(column.Name) !== -1) {
                var newColumn = Object.assign(new index_3.Column(), column);
                newColumns.push(newColumn);
            }
            ;
        });
        var newRows = new Array();
        table.Data.forEach(function (row, index) {
            var newRow = new index_3.Row();
            newColumns.forEach(function (column, index) {
                newRow.Row[column.Name] = row.Row[column.Name];
            });
            if (Object.keys(newRow.Row).length > 0) {
                newRows.push(newRow);
            }
        });
        var newTable = new index_3.Table(table.Name).Construct(newColumns, newRows);
        return newTable;
    };
    Select.prototype.Execute = function () {
        var resultTable = Object.assign(new index_3.Table(this._from.Name), this._from);
        if (this._distinct) {
            resultTable = this._distinct.ExecuteQuery(resultTable);
        }
        if (this._where) {
            resultTable = this._where.ExecuteQuery(resultTable);
        }
        if (this._innerJoin) {
            resultTable = this._innerJoin.ExecuteQuery(resultTable);
        }
        if (this._orderAscending) {
            resultTable = this._orderAscending.ExecuteQuery(resultTable);
        }
        if (this._orderDescending) {
            resultTable = this._orderDescending.ExecuteQuery(resultTable);
        }
        return new index_2.QueryResult(true, 'Select excecuted succesfully!', this.ExecuteSelect(resultTable));
    };
    return Select;
}());
exports.Select = Select;
//# sourceMappingURL=Select.js.map