; (function () {
    "use strict";

    var messagePrefix = "Namespace: ";

    window.Namespace = Namespace;

    function Namespace(params) {
        var self = this;
        
        var nsRoot = new Tree();

        self.Import = function (name) {
            if (!name)
                return nsRoot;

            var leaf = nsRoot.Traverse(name);
            return extendNode(leaf);
        };
    };

    function extendNode(node) {
        var self = node;

        self.Export = function (sig, constructor) {
            if (!sig)
                throw messagePrefix + "Signature was not provided for namespace export";
            if (!constructor || typeof constructor !== "function")
                throw messagePrefix + "Constructor is not valid function";

            self[sig] = constructor;

            for (var index = 0; index < Object.keys(ns.Extensions).length; index++) {
                ns.Extensions[Object.keys(ns.Extensions)[index]](constructor.prototype);
            }
        }

        return self;
    };
})();