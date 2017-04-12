; (function () {
    "use strict";

    var nsString = "Data.Archives.Core", ns = HomeStock.Import(nsString);

    ns.Export("Archive", Archive);
    var messagePrefix = nsString + ": ";

    function Archive(params, protectedData) {
        this.validate(params, "id", "schemaId");
        var self = this;
        
        protectedData = protectedData || {};
        protectedData.Read = function () { throw messagePrefix + "Read Not Implemented"; };
        protectedData.Write = function () { throw messagePrefix + "Write Not Implemented"; };
        protectedData.Remove = function () { throw messagePrefix + "Remove Not Implemented"; };

        var schemaId = params.schemaId;

        self.name = params.id;
        self.Schema = function () { return HomeStock.Schemas[schemaId]; };        

        self["Read"] = function (params) {
            params = params || {};
            var readingData = new HomeStock.Deferred();
            self.trigger("PreRead", [self]);

            var performingRead = protectedData.Read(params);
            performingRead.then(function (records) {
                records = Array.isArray(records) ? records : Array(records);
                var recordSet = new ns.RecordSet(records);

                self.trigger("Read", [recordSet]);
                readingData.resolve(recordSet);
            },
            readingData.reject);

            return readingData.promise();
        };

        self["Write"] = function (recordSet) {
            self.trigger("PreWrite", [recordSet, self]);

            protectedData.Write(recordSet);
            
            self.trigger("Write");
        };

        self["Remove"] = function (recordSet) {
            self.trigger("PreRemove", [recordSet, self]);

            protectedData.Remove(params);

            self.trigger("Remove");
        };

        return self;
    };
})();