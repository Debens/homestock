; (function () {
    "use strict";

    var messagePrefix = "Tree: ";

    window.Tree = Tree;
    window.Node = Node;

    function Tree(params) {
        var self = this;
        params = params || {};

        var root = new Node({ name: "root", parent: null, extend: params.nodeExtension });

        self.Traverse = function (path) {
            if (!path)
                return root.Facade;

            var locationComponents = path.split(".");
            var compententLength = locationComponents.length;

            var currentNode = root;
            for (var index = 0; index < compententLength; index++)
                currentNode = currentNode.ScopeTo(locationComponents.shift());

            currentNode.Path = path;
            return currentNode.Facade;
        };
    };

    function Node(params) {
        var self = this;
        params = params || {};

        var _extend = params.extend;

        self.Name = params.name;
        self.Parent = params.parent;
        self.Children = [];

        self.Facade = { "__node__": self };

        self.ScopeTo = function (name) {
            var matchingChildren = $.grep(self.Children, function (node) { return node.Name == name });
            if (matchingChildren.length > 1)
                throw messagePrefix + "Node '" + self.Name + "' has multiple children named '" + name + "'";

            if (matchingChildren.length == 1)
                return matchingChildren[0];
            else {
                var newChild = new Node({ name: name, parent: self, extend: _extend });
                self.Children.push(newChild);
                return newChild;
            }
        };

        if (typeof _extend === "function")
            _extend(self);
    };
})();