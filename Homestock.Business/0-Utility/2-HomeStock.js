; (function () {
    "use strict";

    var messagePrefix = "HomeStock: ";

    var nameSpace = new window.ns.Tree();

    var HomeStock = {
        "Import": function (nsString) {
            return nameSpace.Traverse(nsString);
        },
        "Config": function () { }
    };

    window.HomeStock = HomeStock;
})();