; (function () {
    "use strict";

    var messagePrefix = "NameSpace.Node: ";

    window.ns = window.ns || {};
    window.ns.Node = Node;

    var requiredParams = [
        "name",
        "parent"
    ];

    var Node = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

        self.Name = params.name;
        self.Parent = params.parent;
        self.Children = [];

        self.ScopeTo = function (name) {
            var childIndex = self.Children.indexOf(name)
            if (childIndex >= 0)
                return self.Children[childIndex];
            else
                return new Node({ name: name, parent: self });
        };
    };
})();