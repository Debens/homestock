; (function () {
    "use strict";

    var nsString = "Data.Suppliers.Core";
    var ns = HomeStock.Import(nsString);

    ns.Schema = Schema;
   
    var messagePrefix = nsString + ".Schema: ";

    var requiredParams = [
        "id",
        "entities"
    ];

    function Schema (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;


        self.Id = params.id;
    };
})();