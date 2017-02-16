; (function () {
    "use strict";

    var requiredParams = [
        "id",
        "modules"
    ];

    window.Business.Worker = Worker;

    var messagePrefix = "Business.Worker: ";

    var Worker = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

        self["Name"] = params.id;
        
        self.Store = ko.observableArray([]);

        constructModules(self, params.modules);
    };

    function constructModules(worker, modules) {
        worker.modules = {};
        for (var index = 0; index < modules.length; index++) {
            var module = modules[index];
            if (!window.Business.Modules[module.Name])
                throw messagePrefix + "Failed to locate modules: " + module.Name;
            module.worker = worker;
            worker.modules[module.Name] = new window.Business.Modules[module.Name](module);
        }
    };
})();