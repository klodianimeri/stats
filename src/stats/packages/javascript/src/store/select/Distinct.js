"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
var Distinct = /** @class */ (function () {
    function Distinct() {
        var distincts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            distincts[_i] = arguments[_i];
        }
        this._distincts = distincts;
    }
    Distinct.prototype.ExecuteQuery = function (input) {
        var newTable = Object.assign(new index_1.Table(input.Name), input);
        this._distincts.forEach(function (distinct, index) {
            var flags = {};
            newTable.Data = newTable.Data.filter(function (entry) {
                if (flags[entry.Row[distinct]]) {
                    return false;
                }
                flags[entry.Row[distinct]] = true;
                return true;
            });
        });
        return newTable;
    };
    return Distinct;
}());
exports.Distinct = Distinct;
//# sourceMappingURL=Distinct.js.map