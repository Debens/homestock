; (function () {
    "use strict";

    var nsString = "Business.ViewModel.Actions", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Binder: ";

    ns.Export("Binder", Binder);

    function Binder() {
        var self = this;

        self.Bind = function (params) {
            self.validate(params, "eventObject", "viewModel");
        };
    };
})();