; (function () {
    "use strict";

    window.ObjectValidator = {
        "validateProperties": function (object, requiredProperties) {
            object = object || {};
            var validationResults = new ValidationResults();

            for (var index = 0; index < requiredProperties.length; index++) {
                var property = requiredProperties[index];
                if (!object.hasOwnProperty(property))
                    validationResults.missingProperties.push(property);
            }

            validationResults.isValid = !validationResults.missingProperties.length;
            return validationResults;
        }
    };

    function ValidationResults(params) {
        var self = this;

        var defaultValues = { isValid: true };
        params = $.extend(defaultValues, params, true);

        self.isValid = params.isValid;
        self.missingProperties = [];

        self.missingProperties.toString = function () {
            return "'" + self.missingProperties.join("', '") + "'";
        };
    };
})();
; (function () {
    "use strict";

    var messagePrefix = "NameSpace: ";

    window.ns = window.ns || {};
    window.ns.Node = Node;
    window.ns.Tree = Tree;

    var requiredNodeParams = [
        "name",
        "parent"
    ];

    var requiredTreeParams = [
    ];

    function Node(params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredNodeParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        self.Name = params.name;
        self.Parent = params.parent;
        self.Children = [];

        self.Facade = { "__node__": self };

        self.ScopeTo = function (name) {
            var matchingChildren = $.grep(self.Children, function (node) { return node.Name == name });
            if (matchingChildren.length > 1)
                throw messagePrefix + "Node '" + self.Name + "' has multiple children called '" + name + "'";

            if (matchingChildren.length == 1)
                return matchingChildren[0];
            else {
                var newChild = new Node({ name: name, parent: self });
                self.Children.push(newChild);
                return newChild;
            }
        };
    };

    function Tree(params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredTreeParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        var nsTree = new window.ns.Node({ name: "root", parent: null });

        self.Traverse = function (nameSapceString) {
            if (!nameSapceString)
                throw messagePrefix + "cannot traverse namespace without a namespace string";

            var nameSpaceComponents = nameSapceString.split(".");
            var compententLength = nameSpaceComponents.length;

            var currentNode = nsTree;
            for (var index = 0; index < compententLength; index++)
                currentNode = currentNode.ScopeTo(nameSpaceComponents.shift());

            return currentNode.Facade;
        };
    };
})();
; (function () {
    "use strict";

    var nameSpace = new window.ns.Tree();

    var HomeStock = {
        "Import": function (nsString) {
            if (!nsString)
                throw messagePrefix + "Must provider a namesapce string to import a namespace";

            return nameSpace.Traverse(nsString);
        },
        "Config": function () { }
    };

    window.HomeStock = HomeStock;
})();
