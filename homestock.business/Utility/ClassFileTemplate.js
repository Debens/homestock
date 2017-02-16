; (function () {
    "use strict";

    var nsString = "";
    var messagePrefix = nsString + ".: ";

    window[nsString]. = ;

    var requiredParams = [
        "id"
    ];

    var  = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

    };
})();