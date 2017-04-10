; (function () {
    "use strict";

    var nsString = "Business.Workers", ns = HomeStock.Import(nsString);
    var nsModules = HomeStock.Import("Business.Worker.Modules");

    ns.Export("Worker", Worker);
    var messagePrefix = nsString + ": ";

    function Worker(params) {
        this.validate(params, "id", "schemaId");
        var self = this;

        params.modules = this.validate.isArray(params.module) ? params.module : [];

        self.Name = params.id;
        self.Store = ko.observableArray([]);

        for (var index = 0; index < modules.length; index++) {
            if (!nsModules[modules[index]])
                self.warn(messagePrefix + "Failed to locate module '" + modules[index] + "'");
            else
                new nsModules[modules[index]](worker);
        }
    };
})();