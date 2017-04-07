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
        var self = node;

        var _loggingEnabled = true;
        self.Logging = {};
        self.Logging.Enable = function (enable) { _loggingEnabled = (enable != false); };
        self.Logging.Enabled = function () { return (_loggingEnabled && parentIsLogging(self)); };

        self.Export = function (sig, constructor) {
            if (!sig)
                throw messagePrefix + "Signature was not provided for namespace export";
            if (!constructor || typeof constructor !== "function")
                throw messagePrefix + "Constructor is not valid function";

            self[sig] = constructor;

            for (var index = 0; index < Object.keys(ns.Extensions).length; index++) {
                ns.Extensions[Object.keys(ns.Extensions)[index]](constructor.prototype, self);
            }
        }

        return self;
    };

    function parentIsLogging(node) {
        return !node.__node__.Parent || nodeIsLogging(node.__node__.Parent.Facade); // returns true if no parent as root node's parent is always 'logging'
    };

    function nodeIsLogging(node) {
        node = node || {};
        return !!node.Logging && typeof node.Logging.Enabled === "function" && node.Logging.Enabled();
    }
})();