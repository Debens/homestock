; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL.Operators";
    var ns = HomeStock.Import(nsString);

    ns.Reader = Reader;
    var messagePrefix = nsString + ".Reader: ";

    var requiredParams = [

    ];

    var Reader = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();