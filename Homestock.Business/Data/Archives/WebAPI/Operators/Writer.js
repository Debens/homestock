; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI.Operators";
    var ns = HomeStock.Import(nsString);

    ns.Writer = Writer;
    var messagePrefix = nsString + ".Writer: ";

    var requiredParams = [

    ];

    var Writer = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();