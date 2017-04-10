; (function () {
    "use strict";

    var nsString = "Util.SQL", ns = HomeStock.Import(nsString);

    ns.Export("TableBuilder", TableBuilder);
    var messagePrefix = nsString + ".TableBuilder: ";

    function TableBuilder (params) {
        this.validate(params, "schemaId");
        var self = this;

        var schemaId = params.schemaId;
        var schema = function () { return HomeStock.Schemas[schemaId]; };
        
        self.Build = function () {
            var tableNames = Object.keys(schema().Entities);

            for (var index = 0; index < tableNames.length; index++) {
                var tableName = tableNames[index];
                var columnNames = Object.keys(schema().Entities[tableName].Columns);
                buildTable(tableName, columnNames);
            }
        };

        function buildTable(tableName, columns) {
            if (!tableName)
                return;
            this.validate.isArray(columns)

            var transaction = new ns.Transaction();
            //TODO: Set the ID column if there is one.
            transaction.CreateTable(tableName, columns).Uniquely().Run();
        };
    };
})();