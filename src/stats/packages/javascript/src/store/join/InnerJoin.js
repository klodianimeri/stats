"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../../core/index");
var index_2 = require("./../../index");
var InnerJoin = /** @class */ (function () {
    function InnerJoin(joinedTable, table1Col, table2Col) {
        this._table2 = joinedTable;
        this._table1Col = table1Col;
        this._table2Col = table2Col;
    }
    InnerJoin.prototype.ExecuteQuery = function (joinTable) {
        var _this = this;
        if (!joinTable) {
            throw new index_1.DatabaseError("JOIN ERROR: Join table is undefined.");
        }
        this._table1 = joinTable;
        var table1Column = this._table1.Columns.filter(function (e) { return e.Name == _this._table1Col; })[0];
        if (!table1Column) {
            throw new index_1.DatabaseError("JOIN ERROR: Column " + this._table1Col + " does not exist in table.");
        }
        else if (!table1Column.IsPrimaryKey) {
            throw new index_1.DatabaseError("JOIN ERROR: Table " + this._table1.Name + " column " + table1Column.Name + " is not a PrimaryKey.");
        }
        var table2Column = this._table2.Columns.filter(function (e) { return e.Name == _this._table2Col; })[0];
        if (!table2Column) {
            throw new index_1.DatabaseError("JOIN ERROR: Column " + this._table2Col + " does not exist in table.");
        }
        else if (!table2Column.IsForeignKey) {
            throw new index_1.DatabaseError("JOIN ERROR: Table " + this._table2.Name + " column " + table1Column.Name + " is not a ForeignKey.");
        }
        var newColumns = new Array();
        this._table1.Columns.forEach(function (column) {
            var newColumn = Object.assign(new index_2.Column(), column);
            newColumn.Name = _this._table1.Name + "." + column.Name;
            newColumns.push(newColumn);
        });
        this._table2.Columns.forEach(function (column) {
            var newColumn = Object.assign(new index_2.Column(), column);
            newColumn.Name = _this._table2.Name + "." + column.Name;
            newColumns.push(newColumn);
        });
        var newRows = new Array();
        this._table1.Data.forEach(function (table1Row) {
            var newRow = new index_2.Row();
            for (var propertyName in table1Row.Row) {
                newRow.Row[_this._table1.Name + "." + propertyName] = table1Row.Row[propertyName];
            }
            var relatedRows = _this._table2.Data.filter(function (table2Row) { return table1Row.Row[table1Column.Name] == table2Row.Row[table2Column.Name]; });
            relatedRows.forEach(function (relatedRow) {
                for (var propertyName in relatedRow.Row) {
                    newRow.Row[_this._table2.Name + "." + propertyName] = relatedRow.Row[propertyName];
                }
                newRows.push(newRow);
            });
        });
        var newTable = new index_2.Table("join_" + this._table1.Name + "+" + this._table2.Name).Construct(newColumns, newRows);
        return newTable;
    };
    return InnerJoin;
}());
exports.InnerJoin = InnerJoin;
//# sourceMappingURL=InnerJoin.js.map