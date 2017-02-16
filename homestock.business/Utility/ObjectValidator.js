; (function () {
    "use strict";

    window.ObjectValidator = {
        "validateProperties": function (object, requiredProperties) {
            var result = { isValid: true, missingProperties: [] };

            for (var index = 0; index < requiredProperties.length; index++) {
                var property = requiredProperties[index];
                if (!object.hasOwnProperty(property))
                    result.missingProperties.push(property);
            }

            result.isValid = !result.missingProperties.length;
            return result;
        }
    };
})();