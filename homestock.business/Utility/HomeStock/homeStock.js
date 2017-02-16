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