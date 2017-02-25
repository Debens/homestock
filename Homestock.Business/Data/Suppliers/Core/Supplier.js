; (function () {
    "use strict";

    var nsString = "Data.Suppliers.Core";
    var ns = HomeStock.Import(nsString);

    ns.Supplier = Supplier;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    var Supplier = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();