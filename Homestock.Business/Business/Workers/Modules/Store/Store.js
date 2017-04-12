; (function () {
    "use strict";

    var nsString = "Business.Workers.Modules", ns = HomeStock.Import(nsString);

    ns.Export("Store", Store);
    var messagePrefix = nsString + ".Store: ";

    function Store (params) {
        this.validate(params, "worker");
        var self = this;

        var worker = params.worker;

        worker.Store = ko.observableArray([]);

        worker.Store.IsEmpty = ko.pureComputed(function () {
            return !worker.Store().length;
        });
    };
})();