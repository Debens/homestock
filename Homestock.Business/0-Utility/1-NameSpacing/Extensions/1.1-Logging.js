; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Logging: ";

    window.ns = window.ns || {};
    window.ns.Extensions = window.ns.Extensions || {};

    window.ns.Extensions.Logging = function (node) {
        node = node || {};

        var _enabled = ko.observable(true);
        node.Logging = {};
        node.Logging.Enable = function (enable) { _enabled(!!enable); };
        node.Logging.Enabled = function () { return _enabled() && (!node.__node__.Parent || nodeIsLogging(node.__node__.Parent.Facade)); };

        node.Log = function (log) {
            if (node.Logging.Enabled())
                console.log(log)
        };
        node.Info = function (info) {
            if (node.Logging.Enabled())
                console.info(info)
        };
        node.Debug = function (debug) {
            if (node.Logging.Enabled())
                console.debug(debug)
        };
        node.Warn = function (warning) {
            if (node.Logging.Enabled())
                console.warn(warning)
        };
        node.Error = function (error) {
            if (node.Logging.Enabled())
                console.error(error)
        };
    };

    function nodeIsLogging(node) {
        node = node || {};
        return !!node.Logging && typeof node.Logging.Enabled === "function" && node.Logging.Enabled();
    }
})();