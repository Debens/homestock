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