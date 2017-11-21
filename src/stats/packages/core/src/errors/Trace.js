"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../index");
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var DatabaseTrace = /** @class */ (function () {
    function DatabaseTrace() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        index_1.DatabaseLogger.trace.apply(index_1.DatabaseLogger, value);
    }
    return DatabaseTrace;
}());
exports.DatabaseTrace = DatabaseTrace;
//# sourceMappingURL=Trace.js.map