; (function () {
    "use strict";

    var nsString = "";
    var messagePrefix = nsString + ".: ";

    window[nsString]. = ;

    var requiredParams = [
        "id"
    ];

    var  = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

    };
})();
; (function () {
    "use strict";

    window.ObjectValidator = {
        "validateProperties": function (object, requiredProperties) {
            var result = { isValid: true, missingProperties: [] };

            for (var index = 0; index < requiredProperties.length; index++) {
                var property = requiredProperties[index];
                if (!object.hasOwnProperty(property))
                    result.missingProperties.push(property);
            }

            result.isValid = !result.missingProperties.length;
            return result;
        }
    };
})();
; (function () {
    "use strict";

    var messagePrefix = "HomeStock: ";

    window.HomeStock = HomeStock;

    var nameSpace = new window.ns.Tree();

    var HomeStock = {
        "Import": function (nsString) {
            if (!nsString)
                throw messagePrefix + "Must provider a namesapce string to import a namespace";

            return nameSpace.Traverse(nsString);
        },
        "Config": function () { }
    };
})();
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
; (function () {
    "use strict";

    var nsString = "";
    var messagePrefix = nsString + ".: ";

    window[nsString]. = ;

    var requiredParams = [
        "id"
    ];

    var  = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

    };
})();
; (function () {
    "use strict";

    window.ObjectValidator = {
        "validateProperties": function (object, requiredProperties) {
            var result = { isValid: true, missingProperties: [] };

            for (var index = 0; index < requiredProperties.length; index++) {
                var property = requiredProperties[index];
                if (!object.hasOwnProperty(property))
                    result.missingProperties.push(property);
            }

            result.isValid = !result.missingProperties.length;
            return result;
        }
    };
})();
; (function () {
    "use strict";

    var messagePrefix = "HomeStock: ";

    window.HomeStock = HomeStock;

    var nameSpace = new window.ns.Tree();

    var HomeStock = {
        "Import": function (nsString) {
            if (!nsString)
                throw messagePrefix + "Must provider a namesapce string to import a namespace";

            return nameSpace.Traverse(nsString);
        },
        "Config": function () { }
    };
})();
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
