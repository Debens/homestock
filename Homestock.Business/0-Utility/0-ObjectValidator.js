; (function () {
    "use strict";

    window.ObjectValidator = {
        "validateProperties": function (object, requiredProperties) {
            object = object || {};
            var validationResults = new ValidationResults();

            for (var index = 0; index < requiredProperties.length; index++) {
                var property = requiredProperties[index];
                if (!object.hasOwnProperty(property))
                    validationResults.missingProperties.push(property);
            }

            validationResults.isValid = !validationResults.missingProperties.length;
            return validationResults;
        }
    };

    function ValidationResults(params) {
        var self = this;

        var defaultValues = { isValid: true };
        params = $.extend(defaultValues, params, true);

        self.isValid = params.isValid;
        self.missingProperties = [];

        self.missingProperties.toString = function () {
            return "'" + self.missingProperties.join("', '") + "'";
        };
    };
})();