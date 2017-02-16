; (function () {
    "use strict";

    var nsString = "Data";
    var messagePrefix = nsString + ".Supplier: ";

    window[nsString].Supplier = Supplier;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    var Supplier = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "params is missing properties: " + validation.missingProperties.join(", ");
        var self = this;

    };
})();