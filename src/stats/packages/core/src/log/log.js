"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseLogLevel;
(function (DatabaseLogLevel) {
    DatabaseLogLevel[DatabaseLogLevel["OFF"] = 0] = "OFF";
    DatabaseLogLevel[DatabaseLogLevel["FATAL"] = 1] = "FATAL";
    DatabaseLogLevel[DatabaseLogLevel["ERROR"] = 2] = "ERROR";
    DatabaseLogLevel[DatabaseLogLevel["WARN"] = 3] = "WARN";
    DatabaseLogLevel[DatabaseLogLevel["INFO"] = 4] = "INFO";
    DatabaseLogLevel[DatabaseLogLevel["DEBUG"] = 5] = "DEBUG";
    DatabaseLogLevel[DatabaseLogLevel["TRACE"] = 6] = "TRACE";
    DatabaseLogLevel[DatabaseLogLevel["ALL"] = 7] = "ALL";
})(DatabaseLogLevel = exports.DatabaseLogLevel || (exports.DatabaseLogLevel = {}));
var DatabaseLogger = /** @class */ (function () {
    function DatabaseLogger() {
    }
    DatabaseLogger.log = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel > DatabaseLogLevel.OFF) {
            this._logger.log(value);
        }
    };
    DatabaseLogger.error = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel >= DatabaseLogLevel.ERROR) {
            this._logger.error(value);
        }
    };
    DatabaseLogger.warn = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel >= DatabaseLogLevel.WARN) {
            this._logger.warn(value);
        }
    };
    DatabaseLogger.info = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel >= DatabaseLogLevel.INFO) {
            this._logger.info(value);
        }
    };
    DatabaseLogger.debug = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel >= DatabaseLogLevel.DEBUG) {
            this._logger.debug(value.toString());
        }
    };
    DatabaseLogger.trace = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (this._logLevel === DatabaseLogLevel.OFF) {
            return;
        }
        if (this._logLevel >= DatabaseLogLevel.TRACE) {
            this._logger.trace(value);
        }
    };
    DatabaseLogger._logger = console;
    DatabaseLogger._logLevel = DatabaseLogLevel.WARN;
    return DatabaseLogger;
}());
exports.DatabaseLogger = DatabaseLogger;
//# sourceMappingURL=log.js.map