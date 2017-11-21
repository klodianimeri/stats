"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../../core/index");
var index_2 = require("./../../index");
var index_3 = require("./../../../../query/index");
var Insert = /** @class */ (function () {
    function Insert(database, queryInsert) {
        this._database = database;
        this._into = this._database.Table(queryInsert.State()[0]);
        if (!this._into) {
            throw new index_1.DatabaseError("INSERT: Table " + queryInsert.State()[0] + " does not exist!");
        }
        this._columns = queryInsert.State()[1];
        this._values = queryInsert.State()[2];
    }
    Insert.prototype.Execute = function () {
        var _this = this;
        var newRow = new index_2.Row();
        var newRowInsert = true;
        // Check if primary colum exists in the new insert
        var primaryKeyColumn = this._into.Columns.find(function (column) { return column.IsPrimaryKey === true; });
        if (primaryKeyColumn && this._columns.indexOf(primaryKeyColumn.Name) == -1) {
            new index_1.DatabaseError("INSERT: Primary Key Column does not exist in insert data!");
            newRowInsert = false;
        }
        // Insert the row
        if (newRowInsert) {
            this._columns.forEach(function (columnName, index) {
                var columnInsert = _this._into.Columns.find(function (column) { return column.Name === columnName; });
                if (columnInsert) {
                    newRow.Row[columnName] = _this._values[index];
                }
                else {
                    newRowInsert = false;
                    new index_1.DatabaseError("INSERT: Column name " + columnName + " does not exist in table " + _this._into.Name + "!");
                }
                if (columnInsert.IsPrimaryKey) {
                    var filteredValueRows = _this._into.Data.filter(function (value) { return value.Row[columnName] === _this._values[columnInsert.Name]; });
                    if (filteredValueRows.length > 0) {
                        newRowInsert = false;
                        new index_1.DatabaseWarn("INSERT: Primary key " + _this._into.Name + "." + columnName + " value " + _this._values[columnInsert.Name] + " constraint violation!");
                    }
                }
                newRowInsert = newRowInsert && columnInsert.ProcessRowForInsert(newRow);
            });
        }
        if (newRowInsert) {
            this._into.Data.push(newRow);
        }
        return new index_3.QueryResult(true, 'Row inserted successfully!');
    };
    return Insert;
}());
exports.Insert = Insert;
//# sourceMappingURL=Insert.js.map