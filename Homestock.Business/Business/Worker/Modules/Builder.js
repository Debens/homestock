; (function () {
    "use strict";

    var nsString = "Business.Worker.Modules", ns = HomeStock.Import(nsString);

    ns.Export("Builder", Builder);
    var messagePrefix = nsString + ".Builder: ";

    function Builder (params) {
        this.validate(params, "worker");
        var self = this;
        
        var worker = params.worker;

        worker.on("Query", function (e, recordSet) {
            buildStore({
                recordSet: recordSet
            });
        });

        var buildStore = function (params) {
            this.validate(params, "recordSet");
            //TODO: Build 
        }.bind(self);
    };
})();