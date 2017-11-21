"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var Table = /** @class */ (function () {
    function Table(name) {
        this._name = name;
        this._columns = new Array();
        this._data = new Array();
    }
    Table.prototype.Construct = function (columns, data) {
        this._columns = columns;
        this._data = data;
        return this;
    };
    Table.prototype.ConstructFromObject = function (object) {
        var _this = this;
        var properties = Object.getOwnPropertyNames(object);
        properties.forEach(function (propertie, index) {
            var newColumn = new index_1.Column(propertie, index_1.TypeUtilities.PrimitiveToDataType(object[propertie]));
            _this._columns.push(newColumn);
        });
        return this;
    };
    Object.defineProperty(Table.prototype, "Columns", {
        get: function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.Column = function (name) {
        return this._columns.filter(function (column) { return column.Name == name; })[0];
    };
    Object.defineProperty(Table.prototype, "Data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=Table.js.map