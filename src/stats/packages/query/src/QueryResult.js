"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../core/index");
var QueryResult = /** @class */ (function () {
    function QueryResult(success, message, table) {
        this.Success = success;
        this.Message = message;
        this.Result = table;
        if (this.Success) {
            new index_1.DatabaseInfo("QUERY RESULT: Query executed succesfully!");
        }
        else {
            new index_1.DatabaseError("QUERY RESULT: Query failed! Message: " + this.Message + ".");
        }
    }
    QueryResult.prototype.AsArray = function () {
        var dataArray = new Array();
        this.Result.Data.entries().next(function (row) { dataArray.push(row); });
        return dataArray;
    };
    return QueryResult;
}());
exports.QueryResult = QueryResult;
//# sourceMappingURL=QueryResult.js.map