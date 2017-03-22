; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Deferred: ";

    HomeStock.Deferred = Deferred;

    var requiredParams = [
        
    ];

    var Deferred = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        // TODO: expand deferred to monitor progress

        return $.Deferred();
    };
})();