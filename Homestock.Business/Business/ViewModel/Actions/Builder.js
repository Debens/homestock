; (function () {
    "use strict";

    var nsString = "Business.ViewModel.Actions", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Builder: ";

    ns.Export("Builder", Builder);

    function Builder () {
        var self = this;

        self.Build = function (params) {
            self.validate(params, "eventObject", "viewModel");
        };
    };
})();