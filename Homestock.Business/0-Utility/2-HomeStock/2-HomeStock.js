; (function () {
    "use strict";

    var messagePrefix = "HomeStock: ";

    var nameSpace = new Namespace();

    var HomeStock = {
        "Import": function (nsString) {
            return nameSpace.Import(nsString);
        },
        "Config": function () { }
    };

    window.HomeStock = HomeStock;
})();