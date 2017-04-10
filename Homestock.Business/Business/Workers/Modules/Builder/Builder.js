; (function () {
    "use strict";

    var nsString = "Business.Workers.Modules", ns = HomeStock.Import(nsString);

    ns.Export("Builder", Builder);
    var messagePrefix = nsString + ".Builder: ";

    function Builder (params) {
        this.validate(params, "worker");
        var self = this;
        
        var _worker = params.worker;
        
        function buildStore() { throw messagePrefix + "ContructStore Method Not Implemented"; };

    };
})();