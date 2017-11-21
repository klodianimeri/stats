"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderAscending = /** @class */ (function () {
    function OrderAscending() {
        var orders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orders[_i] = arguments[_i];
        }
        this._orders = orders;
    }
    OrderAscending.prototype.State = function () {
        return this._orders;
    };
    return OrderAscending;
}());
exports.OrderAscending = OrderAscending;
var OrderDescending = /** @class */ (function () {
    function OrderDescending() {
        var orders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orders[_i] = arguments[_i];
        }
        this._orders = orders;
    }
    OrderDescending.prototype.State = function () {
        return this._orders;
    };
    return OrderDescending;
}());
exports.OrderDescending = OrderDescending;
//# sourceMappingURL=Order.js.map