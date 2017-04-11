; (function () {
    "use strict";

    var nsString = "Business.Workers", ns = HomeStock.Import(nsString);
    var nsModules = HomeStock.Import("Business.Worker.Modules");

    ns.Export("Worker", Worker);
    var messagePrefix = nsString + ": ";

    function Worker(params) {
        this.validate(params, "id", "archiveId");
        var self = this;

        var modules = Array.isArray(params.module) ? params.module : [];

        self.name = params.id;
        self.archive = HomeStock.Archives[params.archiveId];
        self.store = ko.observableArray([]);

        for (var index = 0; index < modules.length; index++) {
            if (!nsModules[modules[index]])
                self.warn(messagePrefix + "Failed to locate module '" + modules[index] + "'");
            else
                new nsModules[modules[index]](worker);
        }
    };
})();