"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../../core/index");
var index_2 = require("./../../index");
var index_3 = require("./../../../../query/index");
var Update = /** @class */ (function () {
    function Update(database, queryUpdate) {
        this._table = this._database.Table(queryUpdate.State()[0]);
        if (!this._table) {
            throw new index_1.DatabaseError("UPDATE: Table " + queryUpdate.State()[0] + " does not exist in database!");
        }
        this._database = database;
        this._where = new (index_2.Where.bind.apply(index_2.Where, [void 0].concat(queryUpdate.State()[1].State())))();
        this._columnValues = queryUpdate.State()[2];
    }
    Update.prototype.ExecuteQuery = function (table) {
        return new index_2.Table("todo");
    };
    Update.prototype.Execute = function () {
        return new index_3.QueryResult(true);
    };
    return Update;
}());
exports.Update = Update;
//# sourceMappingURL=Update.js.map