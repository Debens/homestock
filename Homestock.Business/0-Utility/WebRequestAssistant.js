; (function () {
    "use strict";

    var nsString = "Util";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".WebRequestAssistant: ";

    if (!$) {
        console.error(messagePrefix + "JQuery is required to make web requests. WebRequestAssistant shall not be initialised");
        return;
    }
       
    var constants = { 
        requiredRequestParams: ["url", "type"],
        requestParamDefaults: {
            contentType: "application/json",
            success: function () { },
            error: function () { },
            data: ""
        },
        requestTypes: ["GET", "HEAD", "POST", "DELETE", "UPDATE"]
    }

    var _lastRequestedUrl = "";

    ns.WebRequestAssistant = {
        "Request": function (params) {
            var validation = ObjectValidator.Validate(params, constants.requiredRequestParams);
            if (!validation.isValid)
                throw messagePrefix + "Request is missing required parameters: " + validation.missingProperties.join(", ");
            if (constants.requestTypes.indexOf(params.type) < 0)
                throw messagePrefix + "Request parameter type, '" + params.type + "', does not match one of the following valid types: " + constants.requestTypes.join(", ");

            params = $.extend({}, constants.requestParamDefaults, params, true);

            if (!ObjectValidator.IsFunction(params.success))
                throw messagePrefix + "Success function is not of type 'function'";
            if (!ObjectValidator.IsFunction(params.error))
                throw messagePrefix + "Error function is not of type 'function'";

            _lastRequestedUrl = params.url;
            $.ajax({
                url: params.url,
                type: params.type,
                data: params.data,
                contentType: params.contentType,
                success: params.success,
                error: params.error
            });
        },
        "LastRequestedUrl": function () { return _lastRequestedUrl; }
    };
})();