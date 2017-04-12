; (function () {
    "use strict";

    var nsString = "Business.Worker.Modules", ns = HomeStock.Import(nsString);
    var nsQueryString = "Business.Worker.Modules.Query", nsQuery = HomeStock.Import(nsQueryString);
    
    ns.Export("Query", Query);
    var messagePrefix = nsString + ".Query: ";

    function Query (params) {
        this.validate(params, "worker");
        var self = this;
        
        var worker = params.worker;

        worker.Where = new nsQuery.SQLSpec({ type: "Where" });
        worker.Order = new nsQuery.SQLSpec({ type: "Order" });
        worker.Group = new nsQuery.SQLSpec({ type: "Group" });
        worker.Limit = new nsQuery.SQLSpec({ type: "Limit" });

        worker.Query = function () { throw messagePrefix + "Query Method Not Implemented"; };
    };
})();