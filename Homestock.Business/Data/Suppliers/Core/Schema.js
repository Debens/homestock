; (function () {
    "use strict";

    var nsString = "Data.Suppliers.Core";
    var ns = HomeStock.Import(nsString);

    ns.Schema = Schema;
   
    var messagePrefix = nsString + ".Schema: ";

    var requiredParams = [
        "id"
    ];

    var Schema = function (params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();