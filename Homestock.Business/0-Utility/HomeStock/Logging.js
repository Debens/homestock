; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Logging: ";

    var nsRoot = HomeStock.Import();

    HomeStock.Log = function (log) {
        Write(log, "log");
    };
    HomeStock.Info = function (info) {
        Write(info, "info");
    };
    HomeStock.Debug = function (debug) {
        Write(debug, "debug");
    };
    HomeStock.Warn = function (warning) {
        Write(warning, "warn");
    };
    HomeStock.Error = function (error) {
        Write(error, "error");
    };

    function Write(message, type) {
        if (nsRoot.Logging.Enabled())
            if (message && typeof message === typeof "string" && typeof console[type] === "function")
                console[type](message);
    };
})();