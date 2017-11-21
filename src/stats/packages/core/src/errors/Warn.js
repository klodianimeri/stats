"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var DatabaseWarn = /** @class */ (function () {
    function DatabaseWarn() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        index_1.DatabaseLogger.warn.apply(index_1.DatabaseLogger, value);
    }
    return DatabaseWarn;
}());
exports.DatabaseWarn = DatabaseWarn;
//# sourceMappingURL=Warn.js.map