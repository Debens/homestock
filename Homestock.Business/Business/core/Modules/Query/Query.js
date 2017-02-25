; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Core.Modules";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Query: ";

    ns.Query = Query;

    var Query = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Query"] = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();