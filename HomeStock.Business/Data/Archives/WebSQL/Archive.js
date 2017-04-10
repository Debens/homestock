; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL", ns = HomeStock.Import(nsString);
    var nsCoreString = "Data.Archives.Core", nsCore = HomeStock.Import(nsCoreString);

    ns.Export("Archive", Archive);
    var messagePrefix = nsString + ".Archive: ";

    function Archive(params) {
        this.validate(params, "tableName");
        var self = new nsCore.Archive(params);

        return self;
    };
})();