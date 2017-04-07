; (function () {
    "use strict";

    var nsString = "Business.Core.Modules";
    var messagePrefix = nsString + ".Builder: ";

    var ns = HomeStock.Import(nsString);
    ns.Export("Builder", Builder);

    function Builder (params) {
        this.validate(params, "worker");
        var self = this;
        
        var _worker = params.worker;
        
        function buildStore() { throw messagePrefix + "ContructStore Method Not Implemented"; };

    };
})();