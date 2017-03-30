; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI";
    var nsCoreString = "Data.Archives.Core";
    var nsOperatorString = "Data.Archives.WebAPI.Operators";
    var ns = HomeStock.Import(nsString);
    var nsCore = HomeStock.Import(nsCoreString);
    var nsOperator = HomeStock.Import(nsOperatorString);
    
    ns.Archive = Archive;
    var messagePrefix = nsString + ".Archive: ";

    var requiredParams = [
        "endPoint"
    ];
    
    function Archive(params, protectedData) {
        params = params || {};
        protectedData = protectedData || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for archive '" + params.id + "'";
        var self = new nsCore.Archive(params, protectedData);

        self.Endpoint = params.endPoint;

        protectedData.Read = function (params) {
            var restrictions = params.restrictions;
        };

        protectedData.Write = function (recordSet) {
        };

        protectedData.Remove = function (recordSet) {
        };

        return self;
    };
})();