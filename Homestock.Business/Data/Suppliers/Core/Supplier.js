; (function () {
    "use strict";

    var nsString = "Data.Suppliers.Core";
    var messagePrefix = nsString + ": ";
    var ns = HomeStock.Import(nsString);

    ns.Supplier = Supplier;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    function Supplier(params) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for supplier '" + params.id + "'";
        var self = this;

        self.Name = params.id;

        self.Read = function () { throw messagePrefix + "Read Not Implemented"; };
        self.Save = function () { throw messagePrefix + "Save Not Implemented"; };
        self.Delete = function () { throw messagePrefix + "Delete Not Implemented"; };

        return self;
    };
})();