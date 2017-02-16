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