; (function () {
    "use strict";

    var nsString = "Data.Suppliers.WebSQL.Operators";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Reader: ";

    ns.Reader = Reader;

    var requiredParams = [

    ];

    var Reader = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();