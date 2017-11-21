"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.message = value[0];
        index_1.DatabaseLogger.error.apply(index_1.DatabaseLogger, value);
        return _this;
    }
    return DatabaseError;
}(Error));
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=Error.js.map