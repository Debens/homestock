; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Core.Modules";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Builder: ";

    ns.Builder = Builder;

    var Builder = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        self["ContructStore"] = function () { throw messagePrefix + "ContructStore Method Not Implemented"; };

    };

    function applyValidation(dataStore) {
        throw messagePrefix + "applyValidation method not impemented";
    };
})();