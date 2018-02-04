"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
var Store = /** @class */ (function () {
    function Store(name) {
        var tables = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tables[_i - 1] = arguments[_i];
        }
        this._database = new (index_1.Database.bind.apply(index_1.Database, [void 0, name].concat(tables)))();
    }
    Store.prototype.Insert = function (queryInsert) {
        return new index_1.Insert(this._database, queryInsert).Execute();
    };
    Store.prototype.Select = function (querySelect) {
        return new index_1.Select(this._database, querySelect).Execute();
    };
    Store.prototype.Delete = function (queryDelete) {
        return new index_1.Delete(this._database, queryDelete).Execute();
    };
    Store.prototype.Update = function (queryUpdate) {
        return new index_1.Update(this._database, queryUpdate).Execute();
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map