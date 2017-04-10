; (function () {
    "use strict";

    var nsString = "Business.Workers.Modules", ns = HomeStock.Import(nsString);
    
    ns.Export("Query", Query);
    var messagePrefix = nsString + ".Query: ";

    function Query (params) {
        this.validate(params, "worker");
        var self = this;
        
        var _worker = params.worker;
        
        worker.Query = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();