"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
var Select = /** @class */ (function () {
    function Select() {
    }
    Select.prototype.Select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        this._select = selects;
        return this;
    };
    Select.prototype.Distinct = function () {
        var distincts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            distincts[_i] = arguments[_i];
        }
        this._distinct = new (index_1.Distinct.bind.apply(index_1.Distinct, [void 0].concat(distincts)))();
        return this;
    };
    Select.prototype.Where = function () {
        var wheres = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wheres[_i] = arguments[_i];
        }
        this._where = new (index_1.Where.bind.apply(index_1.Where, [void 0].concat(wheres)))();
        return this;
    };
    Select.prototype.From = function (tableName) {
        this._from = tableName;
        return this;
    };
    Select.prototype.OrderAscending = function () {
        var orders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orders[_i] = arguments[_i];
        }
        this._orderAscending = new (index_1.OrderAscending.bind.apply(index_1.OrderAscending, [void 0].concat(orders)))();
        return this;
    };
    Select.prototype.OrderDescending = function () {
        var orders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orders[_i] = arguments[_i];
        }
        this._orderDescending = new (index_1.OrderDescending.bind.apply(index_1.OrderDescending, [void 0].concat(orders)))();
        return this;
    };
    Select.prototype.InnerJoin = function (joinTableName) {
        this._innerJoin = new index_1.InnerJoin(this, joinTableName);
        return this._innerJoin;
    };
    Select.prototype.State = function () {
        return [this._select, this._from, this._where, this._orderAscending, this._orderDescending, this._distinct, this._innerJoin];
    };
    return Select;
}());
exports.Select = Select;
//# sourceMappingURL=Select.js.map