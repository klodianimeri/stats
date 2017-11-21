"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../core/index");
var index_2 = require("./../index");
var Query = /** @class */ (function () {
    function Query() {
    }
    Query.prototype.setStore = function (store) {
        this._store = store;
    };
    Query.prototype.Select = function (s) {
        if (!this._store) {
            throw new index_1.DatabaseError("QUERY: Store not initialized!");
        }
        var selectInstance = s(new index_2.Select());
        return this._store.Select(selectInstance);
    };
    Query.prototype.Insert = function (i) {
        if (!this._store) {
            throw new index_1.DatabaseError("QUERY: Store not initialized!");
        }
        var insertInstance = i(new index_2.Insert());
        return this._store.Insert(insertInstance);
    };
    Query.prototype.Delete = function (d) {
        if (!this._store) {
            throw new index_1.DatabaseError("QUERY: Store not initialized!");
        }
        var deleteInstance = d(new index_2.Delete());
        return this._store.Delete(deleteInstance);
    };
    Query.prototype.Update = function (u) {
        if (!this._store) {
            throw new index_1.DatabaseError("QUERY: Store not initialized!");
        }
        var updateInstance = u(new index_2.Update());
        return this._store.Update(updateInstance);
    };
    return Query;
}());
exports.Query = Query;
//# sourceMappingURL=Query.js.map