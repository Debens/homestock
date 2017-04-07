; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Archive: ";

    var nsCoreString = "Data.Archives.Core";
    var nsCore = HomeStock.Import(nsCoreString);

    ns.Export("Archive", Archive);

    var requiredParams = [
        "tableName"
    ];

    function Archive(params) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for archive '" + params.id + "'";
        var self = new nsCore.Archive(params);

        return self;
    };
})();