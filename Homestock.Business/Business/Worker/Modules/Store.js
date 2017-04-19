; (function () {
    "use strict";

    var nsString = "Business.Worker.Modules", ns = HomeStock.Import(nsString);
    var nsModulesString = "Business.Worker.Modules.Store.Modules", nsModules = HomeStock.Import(nsModulesString);

    ns.Export("Store", Store);
    var messagePrefix = nsString + ".Store: ";

    function Store (params) {
        this.validate(params, "worker");
        var self = params.worker;
        
        self.Store = ko.observableArray([]);

        self.Store.IsEmpty = ko.pureComputed(function () {
            return !worker.Store().length;
        });

        for (var index = 0; index < nsModules.Members.length; index++) {
            var module = nsModules.Members[index];
            new nsModules[module]({ store: self.Store });
        }
    };
})();