; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Tree: ";
    
    window.ns = window.ns || {};
    window.ns.Tree = Tree

    var requiredParams = [
    ];

    var Tree = function () {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

        var nsTree = new window.ns.Node({ name: "root", parent: null });

        self.Traverse = function (nameSapceString) {
            if (!nameSapceString)
                throw messagePrefix + "cannot traverse namespace without a namespace string";

            var nameSpaceComponents = nameSapceString.split(".");

            var currentNode = nsTree;
            for (var index = 0; index < nameSpaceComponents.length; index++)
                currentNode = currentNode.ScopeTo(nameSpaceComponents.shift());

            return currentNode;
        };
    };
})();