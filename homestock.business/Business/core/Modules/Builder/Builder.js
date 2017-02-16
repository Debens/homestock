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