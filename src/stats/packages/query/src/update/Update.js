"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
var Update = /** @class */ (function () {
    function Update() {
    }
    Update.prototype.Update = function (table) {
        this._table = table;
    };
    Update.prototype.Set = function () {
        var columnValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columnValues[_i] = arguments[_i];
        }
        this._columnValues = columnValues;
        return this;
    };
    Update.prototype.Where = function () {
        var wheres = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wheres[_i] = arguments[_i];
        }
        this._where = new (index_1.Where.bind.apply(index_1.Where, [void 0].concat(wheres)))();
        return this;
    };
    Update.prototype.State = function () {
        return [this._table, this._where, this._columnValues];
    };
    return Update;
}());
exports.Update = Update;
//# sourceMappingURL=Update.js.map