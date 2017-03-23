; (function () {
    "use strict";

    var nsString = "Data.Suppliers.WebSQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Supplier: ";

    var nsCoreString = "Data.Suppliers.Core";
    var nsCore = HomeStock.Import(nsString);

    ns.Supplier = Supplier;

    var requiredParams = [
        "id",
        "tableName",
        "schemaId"
    ];

    Supplier.prototype = $.extend(nsCore.Supplier.prototype, Supplier.prototype, true);

    function Supplier(params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;


        return {};
    };
})();