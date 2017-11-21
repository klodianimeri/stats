"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
var OrderBase = /** @class */ (function () {
    function OrderBase() {
    }
    OrderBase.Compare = function (a, b, property) {
        switch (property.RepresentingType) {
            case index_1.RepresentingType.Boolean:
                if (a[property.Name] == true && b[property.Name] == true)
                    return 0;
                if (a[property.Name] == true && b[property.Name] == false)
                    return 1;
                if (a[property.Name] == false && b[property.Name] == true)
                    return -1;
                break;
            case index_1.RepresentingType.String:
                return a[property.Name].localeCompare(b[property.Name]);
            case index_1.RepresentingType.Array:
            case index_1.RepresentingType.Object:
                return 0;
            default:
                if (a[property.Name] == b[property.Name])
                    return 0;
                if (a[property.Name] > b[property.Name])
                    return 1;
                if (a[property.Name] < b[property.Name])
                    return -1;
                break;
        }
    };
    return OrderBase;
}());
exports.OrderBase = OrderBase;
var OrderAscending = /** @class */ (function () {
    function OrderAscending() {
        var orders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orders[_i] = arguments[_i];
        }
        this._orders = orders;
    }
    OrderAscending.prototype.ExecuteQuery = function (input) {
        var newTable = Object.assign(new index_1.Table(input.Name), input);
        this._orders.forEach(function (orderName, index) {
            var filteredColumns = newTable.Columns.filter(function (e) { return e.Name == orderName; });
            if (filteredColumns.length > 0) {
                newTable.Data.sort(function (a, b) {
                    return OrderBase.Compare(a, b, filteredColumns[0]);
                });
            }
        });
        return newTable;
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
    OrderDescending.prototype.ExecuteQuery = function (input) {
        var newTable = Object.assign(new index_1.Table(input.Name), input);
        this._orders.forEach(function (orderName, index) {
            var filteredColumns = newTable.Columns.filter(function (e) { return e.Name == orderName; });
            if (filteredColumns.length > 0) {
                newTable.Data.sort(function (a, b) {
                    return -OrderBase.Compare(a.Row, b.Row, filteredColumns[0]);
                });
            }
        });
        return newTable;
    };
    return OrderDescending;
}());
exports.OrderDescending = OrderDescending;
//# sourceMappingURL=Order.js.map