; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Logging: ";

    window.ns = window.ns || {};
    window.ns.Extensions = window.ns.Extensions || {};

    window.ns.Extensions.Logging = function (prototype, ns) {
        if (!prototype)
            return;

        prototype.log = function (log) {
            Write(log, "log");
        };
        prototype.info = function (info) {
            Write(info, "info");
        };
        prototype.debug = function (debug) {
            Write(debug, "debug");
        };
        prototype.warn = function (warning) {
            Write(warning, "warn");
        };
        prototype.error = function (error) {
            Write(error, "error");
        };

        function Write(message, type) {
            if (ns.Logging.Enabled())
                if (message && typeof message === typeof "string" && typeof console[type] === "function")
                    console[type](message);
        };
    };
})();