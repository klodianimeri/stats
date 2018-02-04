"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../../core/index");
var index_2 = require("./../../index");
var index_3 = require("./../../../../query/index");
var Delete = /** @class */ (function () {
    function Delete(database, queryDelete) {
        this._database = database;
        this._into = this._database.Table(queryDelete.State()[0]);
        if (!this._into) {
            throw new index_1.DatabaseError("DELETE: Table " + queryDelete.State()[0] + " does not exist in database!");
        }
        this._where = new (index_2.Where.bind.apply(index_2.Where, [void 0].concat(queryDelete.State()[1].State())))();
    }
    Delete.prototype.Execute = function () {
        var _this = this;
        if (!this._where) {
            this._into.Data = new Array();
            return new index_3.QueryResult(true, 'Rows deleted successfully!', this._into);
        }
        var toRemoveTable = this._where.ExecuteQuery(this._into);
        toRemoveTable.Data.forEach(function (row, index, self) {
            var indexOfRow = _this._into.Data.indexOf(row);
            if (indexOfRow !== -1) {
                _this._into.Data.splice(indexOfRow, 1);
            }
        });
        return new index_3.QueryResult(true, 'Rows deleted successfully!', this._into);
    };
    return Delete;
}());
exports.Delete = Delete;
//# sourceMappingURL=Delete.js.map