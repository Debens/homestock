; (function () {
    "use strict"

    window.UriHelper = function UriHelper(uri) {
        var self = this;

        self.uri = uri;

        self.GetQueryStringParameter = function (paramName) {
            var regex = GetRegexForQueryStringParameter(paramName);
            var matches = regex.exec(self.uri);
            if (Array.isArray(matches) && matches[2])
                return matches[2];
            throw "Failed to find query string parameter for " + paramName;
        };

        self.UpdateQueryStringParameter = function (name, newValue) {
            var regex = GetRegexForQueryStringParameter(name);
            return self.uri.match(regex) ? self.uri.replace(regex, '$1' + name + "=" + newValue + '$2') : self.AddQueryStringParameter(name, newValue);
        };

        self.AddQueryStringParameter = function (name, value) {
            var separator = self.uri.indexOf('?') !== -1 ? "&" : "?";
            return self.uri + separator + name + "=" + newValue;
        }

        self.RemoveQueryStringParameter = function (name) {
            var regex = self.GetQueryStringParameter(name);
            if (self.uri.match(regex)) {
                self.uri = self.uri.replace(regex, "");
                self.uri = self.TrimRedundentSeporators(self.uri);
                return self.uri;
            }
        }

        self.GetRecordOptions = function () {
            var param = self.getQueryStringParameter("ItemId");
            param = param.indexOf(",") >= 0 ? param.split(",") : [param];
            return param;
        };

        self.TrimRedundentSeporators = function (uri) {
            if(!uri) {
                throw "URI is required";
            }
            var lastChar = uri.slice(-1);
            var seporators = ['#', '?'];
            if (seporators.indexOf(lastChar) >= 0) {
                return uri.slice(0, -1);
            }
        }

        var GetRegexForQueryStringParameter = function (paramName) {
            return new RegExp("([?&])" + paramName + "=.*?(&|$)", "i");
        };
    }
})();