"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../core/index");
var Database = /** @class */ (function () {
    function Database(name) {
        var tables = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tables[_i - 1] = arguments[_i];
        }
        var _this = this;
        this._tables = {};
        this._relationships = new Array();
        tables.forEach(function (table) {
            if (_this._tables[table.Name]) {
                throw new index_1.DatabaseError("DATABASE: Table with name " + table.Name + " exists in database!");
            }
            _this._tables[table.Name] = table;
        });
    }
    Object.defineProperty(Database.prototype, "Tables", {
        get: function () {
            return this._tables;
        },
        enumerable: true,
        configurable: true
    });
    Database.prototype.Table = function (tableName) {
        return this._tables[tableName];
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=Database.js.map