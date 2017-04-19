; (function () {
    "use strict";

    var nsString = "Business.ViewModel.Actions", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Binder: ";

    ns.Export("Binder", Binder);

    function Binder(params) {
        this.validate(params, "rootNode")
        var self = this;

        var vmRoot = params.rootNode;
        
        self.Bind = function (params) {
            self.validate(params, "eventObject", "viewModel");

            params.eventObject.trigger("PreVMRender");
            ko.cleanNode(vmRoot);
            ko.applyBindings(params.viewModel, vmRoot);
            params.eventObject.trigger("VMRendered");
        };
    };
})();