"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InnerJoin = /** @class */ (function () {
    function InnerJoin(select, joinedTable) {
        this._select = select;
        this._table2 = joinedTable;
    }
    InnerJoin.prototype.On = function (table1Col, table2Col) {
        this._table1Col = table1Col;
        this._table2Col = table2Col;
        return this._select;
    };
    InnerJoin.prototype.State = function () {
        return [this._table2, this._table1Col, this._table2Col];
    };
    return InnerJoin;
}());
exports.InnerJoin = InnerJoin;
//# sourceMappingURL=InnerJoin.js.map