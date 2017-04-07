; (function () {
    "use strict";

    var nsString = "Data.Archives.Core";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".RecordSet: ";

    ns.Export("RecordSet", RecordSet);

    function RecordSet(records) {
        var self = this;

        var _records = [];
        self.Records = function () { return _records; }
        self.length = _records.length;
        
        self.Add = function (records) {
            records = toArray(records);
            _records = _records.concat(records);
            self.length = _records.length;
        };
        self.Remove = function (records) {
            records = toArray(records);
            // TODO : Remove 
            self.length = _records.length;
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

        self.Add(records);
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