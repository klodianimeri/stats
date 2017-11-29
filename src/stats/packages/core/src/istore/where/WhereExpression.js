"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
/**
 * WhereOperator
 */
var WhereOperator;
(function (WhereOperator) {
    WhereOperator[WhereOperator["And"] = 0] = "And";
    WhereOperator[WhereOperator["Or"] = 1] = "Or";
})(WhereOperator = exports.WhereOperator || (exports.WhereOperator = {}));
/**
* ComparisonOperator
*/
var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator[ComparisonOperator["Equal"] = 0] = "Equal";
    ComparisonOperator[ComparisonOperator["NotEqual"] = 1] = "NotEqual";
    ComparisonOperator[ComparisonOperator["Grater"] = 2] = "Grater";
    ComparisonOperator[ComparisonOperator["GreaterThanEqual"] = 3] = "GreaterThanEqual";
    ComparisonOperator[ComparisonOperator["Less"] = 4] = "Less";
    ComparisonOperator[ComparisonOperator["LessThanEqual"] = 5] = "LessThanEqual";
    ComparisonOperator[ComparisonOperator["Like"] = 6] = "Like";
    ComparisonOperator[ComparisonOperator["In"] = 7] = "In";
    ComparisonOperator[ComparisonOperator["Between"] = 8] = "Between";
})(ComparisonOperator = exports.ComparisonOperator || (exports.ComparisonOperator = {}));
/**
* WhereExpression
*/
var WhereExpression = /** @class */ (function () {
    function WhereExpression(whereOperator, propertyColumn, comparisonOperator, value) {
        this._whereOperator = whereOperator;
        this._propertyColumn = propertyColumn;
        this._comparisonOperator = comparisonOperator;
        this._value = value;
    }
    Object.defineProperty(WhereExpression.prototype, "WhereOperator", {
        get: function () {
            return this._whereOperator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WhereExpression.prototype, "PropertyColumn", {
        get: function () {
            return this._propertyColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WhereExpression.prototype, "ComparisonOperator", {
        get: function () {
            return this._comparisonOperator;
        },
        enumerable: true,
        configurable: true
    });
    WhereExpression.prototype.Compare = function (value) {
        var result = false;
        switch (this.ComparisonOperator) {
            case ComparisonOperator.Equal:
                result = this._value === value;
                break;
            case ComparisonOperator.NotEqual:
                result = this._value != value;
                break;
            case ComparisonOperator.Grater:
                result = this._value < value;
                break;
            case ComparisonOperator.GreaterThanEqual:
                result = this._value <= value;
                break;
            case ComparisonOperator.Less:
                result = this._value > value;
                break;
            case ComparisonOperator.LessThanEqual:
                result = this._value >= value;
                break;
            case ComparisonOperator.Like:
                var pattern = new RegExp(this._value);
                result = pattern.test(value);
                break;
            case ComparisonOperator.In:
                if ((this._value.length == 0)) {
                    throw new index_1.DatabaseError("WHERE: Value provided for In is not an array with values!");
                }
                result = this._value.indexOf(value) == -1 ? false : true;
                break;
            case ComparisonOperator.Between:
                if (!(this._value.length == 2)) {
                    throw new index_1.DatabaseError("WHERE: Value provided for Between is not an array with two values!");
                }
                result = ((value >= this._value[0]) && (value <= this._value[1]));
                break;
            default:
                result = false;
                break;
        }
        return result;
    };
    WhereExpression.prototype.CompareWhereOperator = function (a, result) {
        switch (this.WhereOperator) {
            case WhereOperator.And:
                return this.Compare(a[this._propertyColumn]) && result;
            case WhereOperator.Or:
                return this.Compare(a[this._propertyColumn]) || result;
            default:
                return false;
        }
    };
    return WhereExpression;
}());
exports.WhereExpression = WhereExpression;
//# sourceMappingURL=WhereExpression.js.map