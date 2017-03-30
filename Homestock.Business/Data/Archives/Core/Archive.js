; (function () {
    "use strict";

    var nsString = "Data.Archives.Core";
    var messagePrefix = nsString + ": ";
    var ns = HomeStock.Import(nsString);

    ns.Archive = Archive;

    var requiredParams = [
        "id",
        "schemaId"
    ];

    function Archive(params, protectedData) {
        params = params || {};
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ") + ", for archive '" + params.id + "'";
        var self = this;

        protectedData = protectedData || {};
        protectedData.Read = function () { throw messagePrefix + "Read Not Implemented"; };
        protectedData.Write = function () { throw messagePrefix + "Write Not Implemented"; };
        protectedData.Remove = function () { throw messagePrefix + "Remove Not Implemented"; };

        var eventObj = new HomeStock.EventObj();

        self.Name = params.id;

        self.Read = function (params) {
            eventObj.Trigger("PreRead", [self]);

            protectedData.Read(params);

            eventObj.Trigger("Read");
        };
        self.Write = function (recordSet) {
            eventObj.Trigger("PreWrite", [recordSet, self]);

            protectedData.Write(recordSet);
            
            eventObj.Trigger("Write");
        };
        self.Remove = function (recordSet) {
            eventObj.Trigger("PreRemove", [recordSet, self]);

            protectedData.Remove(params);

            eventObj.Trigger("Remove");
        };

        return self;
    };
})();