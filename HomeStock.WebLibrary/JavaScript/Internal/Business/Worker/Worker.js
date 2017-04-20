; (function () {
    "use strict";

    var nsString = "Business.Worker", ns = HomeStock.Import(nsString);
    var nsModulesString = "Business.Worker.Modules", nsModules = HomeStock.Import(nsModulesString);
    var nsWebSQLArchiveString = "Data.Archives.WebSQL", nsWebSQLArchives = HomeStock.Import(nsWebSQLArchiveString);

    ns.Export("Worker", Worker);
    var messagePrefix = nsString + ": ";

    function Worker(params) {
        this.validate(params, "id", "archiveId");
        var self = this;

        self.name = params.id;
        self.archive = HomeStock.Archives[params.archiveId];
        this.validate.isType(self.archive, nsWebSQLArchives.Archive);

        for (var index = 0; index < nsModules.Members.length; index++) {
            var module = nsModules.Members[index];
            new nsModules[module]({ worker: self });
        }
    };
})();