; (function () {
    "use strict";

    var nsString = "Business.ViewModel.Actions", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Builder: ";

    ns.Export("Builder", Builder);

    function Builder () {
        var self = this;

        self.Build = function (params) {
            self.validate(params, "workers", "eventObject", "viewModel");
            
            for (var index = 0; index < Object.keys(params.workers).length; index++) {
                var worker = params.workers[Object.keys(params.workers)[index]];
                if (typeof worker === "object")
                    referenceWorker(params.viewModel, worker);
            }
        };

        var referenceWorker = function (viewModel, worker) {
            if(ko.unwrap(viewModel).hasOwnProperty(worker.name))
                this.warn(messagePrefix + "The view model already defines a worker '" + worker.name + "'. The duplicate worker shall not be added to the view model");
            else 
                ko.unwrap(viewModel)[worker.name] = worker.store;
        }.bind(self);
    };
})();