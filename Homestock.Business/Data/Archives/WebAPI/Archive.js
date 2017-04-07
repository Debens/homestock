; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI", ns = HomeStock.Import(nsString); 
    var nsCoreString = "Data.Archives.Core", nsCore = HomeStock.Import(nsCoreString);
    var nsOperatorString = "Data.Archives.WebAPI.Operators", nsOperator = HomeStock.Import(nsOperatorString);
    var nsUtilString = "Util", nsUtil = HomeStock.Import(nsUtilString);
    
    ns.Export("Archive", Archive);
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

        var urlFormatter = new ns.UrlFormatter();

        protectedData.Read = function (params) {
            var restrictions = params.restrictions || {};
            var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
            if (!url)
                return new HomeStock.Deferred().resolve([]).promise();

            return nsUtil.AjaxAssistant.Request({
                url: url,
                type: "GET",
                success: params.success,
                error: params.error
            });
        };

        protectedData.Write = function (recordSet) {
            var restrictions = params.restrictions || {};

            var requests = [];
            for (var index = 0; index < recordSet.length; index++) {
                var data = recordSet.Records()[index];
                if (!data)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Write, missing data to write" }).promise();
                var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
                if (!url)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Write, cannot to format URL" }).promise();

                //TODO: Validate restrictions against URL

                requests.push(nsUtil.AjaxAssistant.Request({
                    url: url,
                    type: "POST",
                    data: data,
                    success: params.success,
                    error: params.error
                }));
            }

            return $.when.apply($, requests);
        };

        protectedData.Remove = function (recordSet) {
            var restrictions = params.restrictions || {};

            var requests = [];
            for (var index = 0; index < recordSet.length; index++) {
                var data = recordSet.Records()[index];
                if (!data)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Remove, missing data to remove" }).promise();
                var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
                if (!url)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Remove, cannot to format URL" }).promise();

                //TODO: Validate restrictions against URL

                requests.push(nsUtil.AjaxAssistant.Request({
                    url: url,
                    type: "DELETE",
                    success: params.success,
                    error: params.error
                }));
            }

            return $.when.apply($, requests);
        };

        return self;
    };
})();