"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
var Delete = /** @class */ (function () {
    function Delete() {
    }
    Delete.prototype.From = function (table) {
        this._into = table;
        return this;
    };
    Delete.prototype.Where = function () {
        var wheres = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wheres[_i] = arguments[_i];
        }
        this._where = new (index_1.Where.bind.apply(index_1.Where, [void 0].concat(wheres)))();
        return this;
    };
    Delete.prototype.State = function () {
        return [this._into, this._where];
    };
    return Delete;
}());
exports.Delete = Delete;
//# sourceMappingURL=Delete.js.map