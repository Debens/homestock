; (function () {
    "use strict";

    window.ns = window.ns || {};
    window.ns.ObjExtensions = window.ns.ObjExtensions || {};

    window.ns.ObjExtensions.Logging = function (prototype, ns) {
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
            Write(error, "error", true);
        };

        function Write(message, type, force) {
            if (force || ns.__node__.Logging.Enabled())
                if (message && typeof message === typeof "string" && typeof console[type] === "function")
                    console[type](message);
        };
    };
})();