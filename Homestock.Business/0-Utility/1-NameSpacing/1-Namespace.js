﻿; (function () {
    "use strict";

    var messagePrefix = "Namespace: ";

    window.Namespace = Namespace;

    function Namespace(params) {
        var self = this;

        var nsRoot = new Tree({ nodeExtension: extendNode });

        self.Import = function (name) {
            return nsRoot.Traverse(name);
        };
    };

    function extendNode(node) {
        var self = node.Facade;

        var _loggingEnabled = true;
        node.Logging = {};
        node.Logging.Enable = function (enable) { _loggingEnabled = (enable != false); };
        node.Logging.Enabled = function () { return ( _loggingEnabled && parentIsLogging(node)); };

        self.Export = function (sig, constructor) {
            if (!sig)
                throw messagePrefix + "Signature was not provided for namespace export";
            if (!constructor || typeof constructor !== "function")
                throw messagePrefix + "Constructor is not valid function";

            self[sig] = constructor;
            constructor.prototype._fullPath = node.Path + "." + sig;

            for (var index = 0; index < Object.keys(ns.ObjExtensions).length; index++) {
                ns.ObjExtensions[Object.keys(ns.ObjExtensions)[index]](constructor.prototype, self);
            }
        }

        return self;
    };

    function parentIsLogging(node) {
        return !node.Parent || nodeIsLogging(node.Parent); // returns true if no parent as root node's parent is always 'logging'
    };

    function nodeIsLogging(node) {
        node = node || {};
        return !!node.Logging && typeof node.Logging.Enabled === "function" && node.Logging.Enabled();
    }
})();