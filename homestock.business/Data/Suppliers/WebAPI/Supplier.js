; (function () {
    "use strict";

    var nsString = "Data.Suppliers.WebAPI";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Supplier: ";

    ns.Supplier = Supplier;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    function Supplier (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();