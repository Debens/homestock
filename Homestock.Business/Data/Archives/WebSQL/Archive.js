; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Archive: ";

    var nsCoreString = "Data.Archives.Core";
    var nsCore = HomeStock.Import(nsCoreString);

    ns.Archive = Archive;

    var requiredParams = [
        "tableName",
        "schemaId"
    ];

    function Archive(params) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for archive '" + params.id + "'";
        var self = new nsCore.Archive(params);

        var schemaId = params.schemaId;
        self.Schema = function () { return HomeStock.Schemas[schemaId]; };

        return self;
    };
})();