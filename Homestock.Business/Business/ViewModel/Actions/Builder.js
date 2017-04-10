; (function () {
    "use strict";

    var nsString = "Business.ViewModel.Actions", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Builder: ";

    ns.Export("Builder", Builder);

    function Builder () {
        var self = this;

        self.Build = function (params) {
            self.validate(params, "eventObject", "viewModel");
            
            for (var index = 0; index < Object.keys(HomeStock.Workers).length; index++) {
                var worker = HomeStock.Workers[Object.keys(HomeStock.Workers)[index]];
                if (typeof worker === "object")
                    referenceWorker(params.viewModel, worker);
            }
        };

        function referenceWorker(viewModel, worker) {
            if(viewModel().hasOwnProperty(worker.name))
                this.error("ViewModel already defines worker '" + worker.name + "' and it cannot be overriden");
            else 
                viewModel()[worker.name] = worker.store;
        };
    };
})();