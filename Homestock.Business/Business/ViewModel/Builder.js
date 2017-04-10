; (function () {
    "use strict";

    var nsString = "Business.ViewModel", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Builder: ";

    ns.Export("Builder", Builder);

    function Builder () {
        var self = this;

        self.Build = function () { };
    };
})();