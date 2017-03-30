﻿; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI.Operators";
    var ns = HomeStock.Import(nsString);

    var messagePrefix = nsString + ".Reader: ";

    var requiredParams = [
        
    ];

    ns.Reader = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

    };
})();