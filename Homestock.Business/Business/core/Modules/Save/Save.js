; (function () {
    "use strict";

    var requiredParams = [
        "worker"
    ];

    var nsString = "Business.Core.Modules";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Save: ";

    ns.Save = Save;

    var Save = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;
        
        var worker = params.worker;
        
        worker["Save"] = function () { throw messagePrefix + "Save Method Not Implemented"; };
    };
})();