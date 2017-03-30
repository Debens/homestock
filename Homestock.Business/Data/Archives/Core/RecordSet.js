; (function () {
    "use strict";

    var nsString = "Data.Archives.Core";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".RecordSet: ";

    ns.RecordSet = RecordSet;

    var requiredParams = [
        
    ];

    var RecordSet = function (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        var _records = [];
        self.Records = function () { return _records; }

        self.Add = function (records) {
            records = toArray(records);
            _records = _records.concat(records);
        };
        self.Remove = function (records) {
            records = toArray(records);
            // TODO : Remove 
        };

        self.Select = function (predicate) {
            if (!predicate || typeof predicate !== "function")
                return [];
            return _records.filter(predicate);
        };
        self.Find = function (predicate) {
            if (!predicate || typeof predicate !== "function")
                return [];
            return _records.find(predicate);
        };
    };

    function toArray(obj) {
        if (Array.isArray(obj))
            return obj;
        else if (!obj)
            return [];
        else
            return [obj];
    };
})();