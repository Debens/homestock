; (function () {
    "use strict";

    var nsString = "Data.Archives.Core";
    var messagePrefix = nsString + ": ";
    var ns = HomeStock.Import(nsString);

    ns.Export("Archive", Archive);

    function Archive(params, protectedData) {
        this.validate(params, "id", "schemaId");
        var self = this;
        
        protectedData = protectedData || {};
        protectedData.Read = function () { throw messagePrefix + "Read Not Implemented"; };
        protectedData.Write = function () { throw messagePrefix + "Write Not Implemented"; };
        protectedData.Remove = function () { throw messagePrefix + "Remove Not Implemented"; };

        var schemaId = params.schemaId;

        self.Name = params.id;
        self.Schema = function () { return HomeStock.Schemas[schemaId]; };

        var eventObj = new HomeStock.EventObj();
        self.on = function (event, callback) { eventObj.on(event, callback); };
        self.one = function (event, callback) { eventObj.one(event, callback); };
        self.off = function (event) { eventObj.off(event) };
        

        self["Read"] = function (params) {
            params = params || {};
            var readingData = new HomeStock.Deferred();
            eventObj.trigger("PreRead", [self]);

            var performingRead = protectedData.Read(params);
            performingRead.then(function (records) {
                records = Array.isArray(records) ? records : Array(records);
                var recordSet = new ns.RecordSet(records);

                eventObj.trigger("Read", [recordSet]);
                readingData.resolve(recordSet);
            },
            readingData.reject);

            return readingData.promise();
        };

        self["Write"] = function (recordSet) {
            eventObj.trigger("PreWrite", [recordSet, self]);

            protectedData.Write(recordSet);
            
            eventObj.trigger("Write");
        };

        self["Remove"] = function (recordSet) {
            eventObj.trigger("PreRemove", [recordSet, self]);

            protectedData.Remove(params);

            eventObj.trigger("Remove");
        };

        return self;
    };
})();