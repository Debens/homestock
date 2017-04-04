; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Logging: ";

    var nsRoot = HomeStock.Import();

    HomeStock.log = function (log) {
        Write(log, "log");
    };
    HomeStock.info = function (info) {
        Write(info, "info");
    };
    HomeStock.debug = function (debug) {
        Write(debug, "debug");
    };
    HomeStock.warn = function (warning) {
        Write(warning, "warn");
    };
    HomeStock.error = function (error) {
        Write(error, "error");
    };

    HomeStock.Logging = {};
    HomeStock.Logging.Disable = function () { nsRoot.Logging.Enable(false); };
    HomeStock.Logging.Enable = function () { nsRoot.Logging.Enable(true); };

    function Write(message, type) {
        if (nsRoot.Logging.Enabled())
            if (message && typeof message === typeof "string" && typeof console[type] === "function")
                console[type](message);
    };
})();