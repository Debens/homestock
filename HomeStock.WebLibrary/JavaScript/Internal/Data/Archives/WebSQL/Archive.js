; (function () {
    "use strict";

    var nsString = "Data.Archives.WebSQL", ns = HomeStock.Import(nsString);
    var nsCoreString = "Data.Archives.Core", nsCore = HomeStock.Import(nsCoreString);
    var nsSQLString = "Util.SQL", nsSQL = HomeStock.Import(nsSQLString);

    ns.Export("Archive", Archive);
    var messagePrefix = nsString + ".Archive: ";

    function Archive(params, protectedData) {
        protectedData = protectedData || {};
        protectedData.self = protectedData.self || this;

        new nsCore.Archive(params, protectedData);
        var self = protectedData.self;

        initTables(self.Schema());

        function initTables (schema) {
            schema = schema || self.Schema();
            new nsSQL.TableBuilder().Build(schema);
        };

        return self;
    };
})();