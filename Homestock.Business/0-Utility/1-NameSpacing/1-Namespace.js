; (function () {
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

        self.Export = function (signature, obj) {
            if (!obj)
                return null;
            if (!signature)
                throw messagePrefix + "Signature was not provided for namespace export";

            self[signature] = obj;

            if (typeof obj === "function") {
                obj.prototype._fullPath = node.Path + "." + signature;

                for (var index = 0; index < Object.keys(ns.ObjExtensions).length; index++) {
                    ns.ObjExtensions[Object.keys(ns.ObjExtensions)[index]](obj.prototype, self);
                }
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