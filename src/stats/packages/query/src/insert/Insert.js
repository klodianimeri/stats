"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insert = /** @class */ (function () {
    function Insert() {
    }
    Insert.prototype.Insert = function () {
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        this._columns = columns;
        return this;
    };
    Insert.prototype.Into = function (tableName) {
        this._into = tableName;
        return this;
    };
    Insert.prototype.Values = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
        return this;
    };
    Insert.prototype.State = function () {
        return [this._into, this._columns, this._values];
    };
    return Insert;
}());
exports.Insert = Insert;
//# sourceMappingURL=Insert.js.map