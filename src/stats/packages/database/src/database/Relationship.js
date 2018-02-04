"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Relationship = /** @class */ (function () {
    function Relationship(table, tableOn, tableOnColumn) {
        this._relationshipId = "foreignkey_" + table.Name + "_" + tableOn.Name + "_on_" + tableOnColumn.Name;
        this._table = table;
        this._tableOn = tableOn;
        this._tableOnColumn = tableOnColumn;
    }
    return Relationship;
}());
exports.Relationship = Relationship;
//# sourceMappingURL=Relationship.js.map