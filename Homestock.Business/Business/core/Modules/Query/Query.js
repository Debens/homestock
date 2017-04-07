; (function () {
    "use strict";

    var nsString = "Business.Core.Modules";
    var messagePrefix = nsString + ".Query: ";

    var ns = HomeStock.Import(nsString);
    ns.Export("Query", Query);

    function Query (params) {
        this.validate(params, "worker");
        var self = this;
        
        var _worker = params.worker;
        
        worker.Query = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();