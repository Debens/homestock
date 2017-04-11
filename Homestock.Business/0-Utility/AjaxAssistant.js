; (function () {
    "use strict";

    var nsString = "Util", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".AjaxAssistant: ";

    ns.Export("AjaxAssistant", AjaxAssistant);
    
    var constants = { 
        requiredRequestParams: ["url", "type"],
        requestParamDefaults: {
            contentType: "application/x-www-form-urlencoded",
            success: function () { },
            error: function () { },
            data: ""
        },
        requestTypes: ["GET", "HEAD", "POST", "DELETE", "UPDATE"]
    }
    
    function AjaxAssistant () {
        var self = this;

        var _lastRequestedUrl = "";
        self.LastRequestedUrl = function () { return _lastRequestedUrl; }

        self.Request = function (params) {
            this.validate(params, constants.requiredRequestParams);
            if (constants.requestTypes.indexOf(params.type) < 0)
                throw messagePrefix + "Request parameter type, '" + params.type + "', does not match one of the following valid types: " + constants.requestTypes.join(", ");

            var request = new HomeStock.Deferred();
            params = $.extend({}, constants.requestParamDefaults, params, true);

            this.validate.isFunction(params.success);
            this.validate.isFunction(params.error);
                
            var successWrapper = function (response) {
                params.success(response);
                request.resolve(response);
            };
            var errorWrapper = function (response) {
                params.error(response);
                request.reject(response);
            };

            _lastRequestedUrl = params.url;
            $.ajax({
                url: params.url,
                type: params.type,
                data: params.data,
                contentType: params.contentType,
                success: successWrapper,
                error: errorWrapper
            });

            return request.promise();
        }
    };
})();