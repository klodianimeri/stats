"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
var Where = /** @class */ (function () {
    function Where() {
        var wheres = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wheres[_i] = arguments[_i];
        }
        this._wheres = wheres;
    }
    Where.prototype.ExecuteQuery = function (input) {
        var _this = this;
        var newColumns = Object.assign(new Array(), input.Columns);
        var newRows = new Array();
        input.Data.forEach(function (row, index) {
            var pass = true;
            _this._wheres.forEach(function (whereExpression, index) {
                pass = whereExpression.CompareWhereOperator(row.Row, pass);
            });
            if (pass) {
                newRows.push(row);
            }
        });
        var newTable = new index_1.Table(input.Name).Construct(newColumns, newRows);
        return newTable;
    };
    return Where;
}());
exports.Where = Where;
//# sourceMappingURL=Where.js.map