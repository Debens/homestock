; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Schema: ";

    var _schemas = {};
    HomeStock.Schemas = _schemas;

    HomeStock.Schemas.Add = function (schema) {
        if (_schemas.hasOwnProperty(schema.Id))
            console.error(messagePrefix + "Duplicate schema ID '" + schema.Id + "', the duplicate shall not be included");
        _schemas[schema.Id] = schema;
    };
})();