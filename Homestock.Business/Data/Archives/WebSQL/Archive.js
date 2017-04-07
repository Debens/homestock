; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Archive: ";

    var nsCoreString = "Data.Archives.Core";
    var nsCore = HomeStock.Import(nsCoreString);

    ns.Export("Archive", Archive);

    var requiredParams = [
        "tableName"
    ];

    function Archive(params) {
        this.validate(params, "tableName");
        var self = new nsCore.Archive(params);

        return self;
    };
})();