"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DataType
 */
var DataType;
(function (DataType) {
    DataType[DataType["Boolean"] = 0] = "Boolean";
    DataType[DataType["Integer"] = 1] = "Integer";
    DataType[DataType["Double"] = 2] = "Double";
    DataType[DataType["String"] = 3] = "String";
    DataType[DataType["GeoPoint"] = 4] = "GeoPoint";
    DataType[DataType["Set"] = 5] = "Set";
    DataType[DataType["Complex"] = 6] = "Complex";
    DataType[DataType["Date"] = 7] = "Date";
    DataType[DataType["Time"] = 8] = "Time";
    DataType[DataType["DateTime"] = 9] = "DateTime";
})(DataType = exports.DataType || (exports.DataType = {}));
/**
 * RepresentingType
 */
var RepresentingType;
(function (RepresentingType) {
    RepresentingType[RepresentingType["Boolean"] = 0] = "Boolean";
    RepresentingType[RepresentingType["Number"] = 1] = "Number";
    RepresentingType[RepresentingType["String"] = 2] = "String";
    RepresentingType[RepresentingType["Date"] = 3] = "Date";
    RepresentingType[RepresentingType["Array"] = 4] = "Array";
    RepresentingType[RepresentingType["Object"] = 5] = "Object";
})(RepresentingType = exports.RepresentingType || (exports.RepresentingType = {}));
var TypeUtilities = /** @class */ (function () {
    function TypeUtilities() {
    }
    TypeUtilities.RepresentingToDataType = function (representingType) {
        switch (representingType) {
            case RepresentingType.Array: return DataType.Set;
            case RepresentingType.Boolean: return DataType.Boolean;
            case RepresentingType.Number: return DataType.Integer;
            case RepresentingType.Date: return DataType.Date;
            case RepresentingType.Object: return DataType.Complex;
        }
    };
    TypeUtilities.DataToRepresentingType = function (dataType) {
        switch (dataType) {
            case DataType.Boolean: return RepresentingType.Boolean;
            case DataType.Complex: return RepresentingType.Object;
            case DataType.Date: return RepresentingType.Date;
            case DataType.DateTime: return RepresentingType.Date;
            case DataType.Double: return RepresentingType.Number;
            case DataType.GeoPoint: return RepresentingType.Array;
            case DataType.Integer: return RepresentingType.Number;
            case DataType.Set: return RepresentingType.Array;
            case DataType.String: return RepresentingType.String;
            case DataType.Time: return RepresentingType.Date;
        }
    };
    TypeUtilities.PrimitiveToRepresentingType = function (primitiveType) {
        switch (typeof primitiveType) {
            case 'boolean': return RepresentingType.Boolean;
            case 'number': return RepresentingType.Number;
            case 'string': return RepresentingType.String;
            case 'object': return RepresentingType.Object;
        }
    };
    TypeUtilities.PrimitiveToDataType = function (primiveType) {
        return TypeUtilities.RepresentingToDataType(TypeUtilities.PrimitiveToRepresentingType(primiveType));
    };
    return TypeUtilities;
}());
exports.TypeUtilities = TypeUtilities;
//# sourceMappingURL=DataType.js.map