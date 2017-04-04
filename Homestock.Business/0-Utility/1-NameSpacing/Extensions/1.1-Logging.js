; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Logging: ";

    window.ns = window.ns || {};
    window.ns.Extensions = window.ns.Extensions || {};

    window.ns.Extensions.Logging = function (node) {
        node = node || {};

        var _enabled = true;
        node.Logging = {};
        node.Logging.Enable = function (enable) { _enabled = !!enable; };
        node.Logging.Enabled = function () { return (_enabled && parentIsLogging(node)); };

        node.log = function (log) {
            Write(log, "log");
        };
        node.info = function (info) {
            Write(info, "info");
        };
        node.debug = function (debug) {
            Write(debug, "debug");
        };
        node.warn = function (warning) {
            Write(warning, "warn");
        };
        node.error = function (error) {
            Write(error, "error");
        };

        function Write(message, type) {
            if (node.Logging.Enabled())
                if (message && typeof message === typeof "string" && typeof console[type] === "function")
                    console[type](message);
        };
    };

    function parentIsLogging(node) {
        return !node.__node__.Parent || nodeIsLogging(node.__node__.Parent.Facade); // returns true if no parent as root node's parent is always 'logging'
    };

    function nodeIsLogging(node) {
        node = node || {};
        return !!node.Logging && typeof node.Logging.Enabled === "function" && node.Logging.Enabled();
    }
})();