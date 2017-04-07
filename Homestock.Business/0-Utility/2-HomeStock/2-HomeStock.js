; (function () {
    "use strict";

    var messagePrefix = "HomeStock: ";
    
    function HomeStock () {
        var self = this;

        var nameSpace = new Namespace();

        self.Import = function (nsString) {
            return nameSpace.Import(nsString);
        }

        self.Config = function () { };
    };

    window.HomeStock = new HomeStock();
    window.HomeStock.Import().Export("HomeStock", HomeStock);
})();