; (function () {
    "use strict";

    var nsString = "Util.SQL", ns = HomeStock.Import(nsString);

    ns.Export("TableBuilder", TableBuilder);
    var messagePrefix = nsString + ".TableBuilder: ";

    function TableBuilder() {
        var self = this;
        
        self.Build = function (schema) {
            this.validate(schema, "Entities");
            var entities = Object.keys(schema.Entities);

            for (var index = 0; index < entities.length; index++) 
                self.BuildTable(schema.Entities[entities[index]]);
        };

        self.BuildTable = function (entity) {
            this.validate(entity, "columns");
            var tableName = entity.name;
            var columns = buildColumns(entity.columns);

            var transaction = new ns.Transaction();
            transaction.CreateTable(tableName, columns).Uniquely().Run();
        };

        function buildColumns(columns) {
            var sqlColumns = [];
            for (var index = 0; index < Object.keys(columns).length; index++) {
                var column = columns[Object.keys(columns)[index]];
                var sqlColumn = column.name;
                if (column.isIdentity)
                    sqlColumn += " " + ns.Keywords.primaryKey;
                sqlColumns.push(sqlColumn);
            }
            return sqlColumns;
        };
    };
})();