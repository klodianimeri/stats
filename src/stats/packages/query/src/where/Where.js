"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Where = /** @class */ (function () {
    function Where() {
        var wheres = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wheres[_i] = arguments[_i];
        }
        this._wheres = wheres;
    }
    Where.prototype.State = function () {
        return this._wheres;
    };
    return Where;
}());
exports.Where = Where;
//# sourceMappingURL=Where.js.map