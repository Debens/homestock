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
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Builder: ";

    window[nsString].Builder = Builder;

    var Builder = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        self["ContructStore"] = function () { throw messagePrefix + "ContructStore Method Not Implemented"; };

    };

    function applyValidation(dataStore) {
        throw messagePrefix + "applyValidation method not impemented";
    };
})();
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Query: ";

    window[nsString].Query = Query;

    var Query = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Query"] = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Save: ";

    window[nsString].Save = Save;

    var Save = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Save"] = function () { throw messagePrefix + "Save Method Not Implemented"; };
    };
})();
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
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Builder: ";

    window[nsString].Builder = Builder;

    var Builder = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        self["ContructStore"] = function () { throw messagePrefix + "ContructStore Method Not Implemented"; };

    };

    function applyValidation(dataStore) {
        throw messagePrefix + "applyValidation method not impemented";
    };
})();
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Query: ";

    window[nsString].Query = Query;

    var Query = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Query"] = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();
; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Module";
    var messagePrefix = nsString + ".Save: ";

    window[nsString].Save = Save;

    var Save = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Save"] = function () { throw messagePrefix + "Save Method Not Implemented"; };
    };
})();
