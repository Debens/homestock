; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL.Operators";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Writer: ";

    ns.Writer = Writer;

    var requiredParams = [

    ];

    var Writer = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();