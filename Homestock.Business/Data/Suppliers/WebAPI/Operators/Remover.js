; (function () {
    "use strict";

    var nsString = "Data.Suppliers.WebAPI.Operators";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Remover: ";

    ns.Remover = Remover;

    var requiredParams = [

    ];

    var Remover = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();