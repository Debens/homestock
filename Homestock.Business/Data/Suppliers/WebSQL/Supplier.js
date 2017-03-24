; (function () {
    "use strict";

    var nsString = "Data.Suppliers.WebSQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Supplier: ";

    var nsCoreString = "Data.Suppliers.Core";
    var nsCore = HomeStock.Import(nsCoreString);

    ns.Supplier = Supplier;

    var requiredParams = [
        "tableName"
    ];

    function Supplier(params) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for supplier '" + params.id + "'";
        var self = new nsCore.CoreSupplier(params);


        return self;
    };
})();