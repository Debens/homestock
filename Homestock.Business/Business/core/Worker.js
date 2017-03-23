﻿; (function () {
    "use strict";

    var nsString = "Business.Core";
    var ns = HomeStock.Import(nsString);
    var nsModules = HomeStock.Import("Business.Core.Modules");

    ns.Worker = Worker;

    var messagePrefix = nsString + ".Worker: ";
    var requiredParams = [
        "id",
        "schemaId"
    ];

    function Worker(params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.toString();
        var self = this;

        params.modules = params.module || [];

        self["Name"] = params.id;
        
        self.Store = ko.observableArray([]);

        constructModules(self, params.modules);
    };

    function constructModules(worker, modules) {
        worker.modules = {};
        for (var index = 0; index < modules.length; index++) {
            var module = modules[index];
            if (!nsModules[module.Name])
                throw messagePrefix + "Failed to locate modules: " + module.Name;
            module.worker = worker;
            worker.modules[module.Name] = new window.Business.Modules[module.Name](module);
        }
    };
})();