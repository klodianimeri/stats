"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Distinct = /** @class */ (function () {
    function Distinct() {
        var distincts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            distincts[_i] = arguments[_i];
        }
        this._distincts = distincts;
    }
    Distinct.prototype.State = function () {
        return this._distincts;
    };
    return Distinct;
}());
exports.Distinct = Distinct;
//# sourceMappingURL=Distinct.js.map