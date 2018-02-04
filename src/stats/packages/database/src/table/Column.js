"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../../core/index");
var index_2 = require("./../index");
var Column = /** @class */ (function () {
    function Column(name, dataType, primaryKey, foreignKey, length, check, defaultValue, allowNull, comments, mimeType) {
        this._primaryKey = false;
        this._foreignKey = false;
        this._allowNull = true;
        this._name = name;
        this._type = dataType;
        this._primaryKey = primaryKey;
        this._foreignKey = foreignKey;
        this._length = length;
        this._check = check;
        this._defaultValue = defaultValue;
        this._allowNull = allowNull;
        this._comments = comments;
        this._mimeType = mimeType;
        if (dataType) {
            this._representingType = index_2.TypeUtilities.DataToRepresentingType(dataType);
        }
    }
    Object.defineProperty(Column.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "IsPrimaryKey", {
        get: function () {
            return this._primaryKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "IsForeignKey", {
        get: function () {
            return this._foreignKey;
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype.MakePrimaryKey = function () {
        this._primaryKey = true;
    };
    Column.prototype.MakeForeignKey = function () {
        this._foreignKey = true;
    };
    Object.defineProperty(Column.prototype, "RepresentingType", {
        get: function () {
            return this._representingType;
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype.ProcessRowForInsert = function (row) {
        var value = row.Row[this._name];
        if (this._primaryKey && ((typeof value == undefined) || value == null)) {
            new index_1.DatabaseError("ROW PROCESS: Column " + this._name + " primary key constraint violation!");
            return false;
        }
        if (this._defaultValue && ((typeof value == undefined) || value == null)) {
            value = row.Row[this._name] = this._defaultValue;
        }
        if (!this._allowNull && ((typeof value == undefined) || value == null)) {
            new index_1.DatabaseError("ROW PROCESS: Column " + this._name + " not null constraint violation!");
            return false;
        }
        if (this._length && (value.length >= this._length)) {
            new index_1.DatabaseError("ROW PROCESS: Column " + this._name + " length constraint violation!");
            return false;
        }
        if (this._check && this._check.indexOf(value) == -1) {
            new index_1.DatabaseError("ROW PROCESS: Column " + this._name + " check constraint violation!");
            return false;
        }
        return true;
    };
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=Column.js.map