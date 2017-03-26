; (function () {
    "use strict";

    var nsString = "Data.Suppliers.Core";
    var messagePrefix = nsString + ": ";
    var ns = HomeStock.Import(nsString);

    ns.Supplier = Supplier;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    function Supplier(params, protectedData) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for supplier '" + params.id + "'";
        var self = this;

        protectedData = protectedData || {};
        protectedData.Read = function () { throw messagePrefix + "Read Not Implemented"; };
        protectedData.Save = function () { throw messagePrefix + "Save Not Implemented"; };
        protectedData.Delete = function () { throw messagePrefix + "Delete Not Implemented"; };

        var eventObj = new HomeStock.EventObj();

        self.Name = params.id;

        self.Read = function (params) {
            eventObj.Trigger("PreRead", [self]);

            protectedData.Read(params);

            eventObj.Trigger("Read");
        };
        self.Save = function (recordSet) {
            eventObj.Trigger("PreSave", [recordSet, self]);

            protectedData.Save(recordSet);
            
            eventObj.Trigger("Save");
        };
        self.Delete = function (recordSet) {
            eventObj.Trigger("PreDelete", [recordSet, self]);

            protectedData.Delete(params);

            eventObj.Trigger("Delete");
        };

        return self;
    };
})();