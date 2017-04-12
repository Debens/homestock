; (function () {
    "use strict";

    var nsString = "Business.Workers.Modules", ns = HomeStock.Import(nsString);

    ns.Export("Save", Save);
    var messagePrefix = nsString + ".Save: ";

    function Save (params) {
        this.validate(params, "worker");
        var self = this;
        
        var worker = params.worker;
        
        worker.Save = function () { throw messagePrefix + "Save Method Not Implemented"; };
    };
})();