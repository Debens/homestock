; (function () {
    "use strict";

    var nsString = "";
    var ns = HomeStock.Import(nsString);

    ns. = ;
    var messagePrefix = nsString + ".: ";

    var requiredParams = [
        "id"
    ];

    var  = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();