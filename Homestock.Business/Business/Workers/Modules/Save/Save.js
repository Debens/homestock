; (function () {
    "use strict";

    var nsString = "Business.Workers.Modules", ns = HomeStock.Import(nsString);

    ns.Export("Save", Save);
    var messagePrefix = nsString + ".Save: ";

    var Save = function (params) {
        this.validate(params, "worker");
        var self = this;
        
        var _worker = params.worker;
        
        worker.Save = function () { throw messagePrefix + "Save Method Not Implemented"; };
    };
})();