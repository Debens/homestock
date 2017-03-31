; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI", ns = HomeStock.Import(nsString); 
    var nsCoreString = "Data.Archives.Core", nsCore = HomeStock.Import(nsCoreString);
    var nsOperatorString = "Data.Archives.WebAPI.Operators", nsOperator = HomeStock.Import(nsOperatorString);
    var nsUtilString = "Util", nsUtil = HomeStock.Import(nsUtilString);
    
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
            var restrictions = params.restrictions || {};
            var formatter = new ns.UrlFormatter();
            var url = new ns.UrlFormatter().Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
            if (!url)
                return HomeStock.Deferred().resolve().promise();
            return nsUtil.WebRequestAssistant.Request({ url: url, type: "GET" });
        };

        protectedData.Write = function (recordSet) {
        };

        protectedData.Remove = function (recordSet) {
        };

        return self;
    };
})();