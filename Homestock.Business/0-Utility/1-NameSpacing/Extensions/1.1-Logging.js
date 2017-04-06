; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Logging: ";

    window.ns = window.ns || {};
    window.ns.Extensions = window.ns.Extensions || {};

    window.ns.Extensions.Logging = function (prototype) {
        if (!prototype)
            return;

        var _enabled = true;
        prototype.Logging = {};
        prototype.Logging.Enable = function (enable) { _enabled = (enable != false); };
        prototype.Logging.Enabled = function () { return (_enabled && parentIsLogging(prototype)); };

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
            if (prototype.Logging.Enabled())
                if (message && typeof message === typeof "string" && typeof console[type] === "function")
                    console[type](message);
        };
    };

    function parentIsLogging(prototype) {
        return !prototype.__prototype__.Parent || prototypeIsLogging(prototype.__prototype__.Parent.Facade); // returns true if no parent as root prototype's parent is always 'logging'
    };

    function prototypeIsLogging(prototype) {
        prototype = prototype || {};
        return !!prototype.Logging && typeof prototype.Logging.Enabled === "function" && prototype.Logging.Enabled();
    }
})();