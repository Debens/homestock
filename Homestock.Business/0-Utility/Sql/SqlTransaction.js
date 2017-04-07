; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SqlTransaction: ";

    ns.Export("SqlTransaction", SqlTransaction);

    function SqlTransaction () {
        var self = this;

        var sqlRunner = new ns.SqlRunner();

        var _operation = "";
        var _table = "";
        var _columns = [];
        var _joins = [];
        var _constraints = [];

        self.toString = function () { return buildStatement() };

        self.Run = function () {
            var sql = self.toString();
            if (!sql)
                this.warn(messagePrefix + "Attempting to run empty SQL resulting no effect");

            self.Clear();
            return sql ? sqlRunner.Run(sql) : new HomeStock.Deferred().resolve().promise();
        };

        self.Clear = function () {
            _operation = "";
            _table = "";
            _columns = [];
            _joins = [];
            _constraints = [];
        };

        self["CreateDB"] = function () { /*TODO*/ };

        self["CreateTable"] = function (tableName, columnNames) {
            if (tableName) {
                if (!columnNames || !Array.isArray(columnNames) || !columnNames.length)
                    throw messagePrefix + "Cannot create table '" + tableName + "' without any columns";

                _operation = ns.Keywords.create + " " + ns.Keywords.table;
                _table = { name: tableName };
                _columns = columnNames;
            }
            return self;
        };
        self["AleterTable"] = function () { /*TODO*/ };
        self["DropTable"] = function (tableName) {
            if (tableName) {
                _operation = ns.Keywords.drop + " " + ns.Keywords.table;
                _table = { name: tableName };
            }
            return self;
        };

        self["Uniquely"] = function () { _operation += " " + ns.Keywords.if + " " + ns.Keywords.not + " " + ns.Keywords.exists; return self; };
            
        self["Select"] = function () { _operation = ns.Keywords.select; return self; };
        self["Delete"] = function () { _operation = ns.Keywords.delete; return self; };
        self["Update"] = function (columnValues, columnNames) {
            if (!Array.isArray(columnNames))
                throw messagePrefix + "Cannot update without array of column names";
            if (!Array.isArray(columnValues))
                throw messagePrefix + "Cannot update without array of column values";
            if (columnNames.length !== columnValues.length)
                throw messagePrefix + "Update column names/values mismatch";

            if (columnNames.length) {
                _operation = ns.Keywords.update;
                var updates = [];
                for (var index = 0; index < columnNames.length; index++) {
                    updates.push(columnNames[index] + " = '" + columnValues[index] + "'")
                }
                _constraints.push(ns.Keywords.set + " " + updates.join(", "));
            }

            return self;
        };
        self["Insert"] = function (columnValues, columnNames) {
            if (!Array.isArray(columnNames))
                throw messagePrefix + "Cannot update without array of column names";
            if (!Array.isArray(columnValues))
                throw messagePrefix + "Cannot update without array of column values";
            if (columnNames.length !== columnValues.length)
                throw messagePrefix + "Update column names/values mismatch";

            _operation = ns.Keywords.insert;
            _table = { name: "( " + columnNames.join(", ") + " )" };
            _constraints.push(ns.Keywords.values + " ( '" + columnValues.join("', '") + "' )");

            return self;
        };

        self["Into"] = function (tableName) {
            if (tableName) 
                _table.name = tableName + " " + _table.name;
            
            return self;
        };
        self["From"] = function (tableName, tableAlias) { _table = { name: tableName, alias: tableAlias }; return self; };

        self["Where"] = function (whereClause) { if (whereClause) { _constraints.push(ns.Keywords.where + " " + whereClause); } return self; };
        self["GroupBy"] = function (groupClause) { if (groupClause) { _constraints.push(ns.Keywords.groupby + " " + groupClause); } return self; };
        self["OrderBy"] = function (orderClause) { if (orderClause) { _constraints.push(ns.Keywords.orderby + " " + orderClause); } return self; };
        self["Limit"] = function (count, offset) {
            if (count) {
                var constraint = ns.Keywords.limit + " " + count;
                if (offset || offset == 0)
                    constraint += " " + ns.Keywords.offset + " " + offset;
                _constraints.push(constraint);
            }
            return self;
        };

        self["InnerJoin"] = function () { /*TODO*/ };
        self["LeftJoin"] = function () { /*TODO*/ };
        self["RightJoin"] = function () { /*TODO*/ };

        function buildStatement() {
            var sql = "";
            sql += _operation ? _operation + " " : "";
            sql += _table.name ? _table.name + " " : "";
            sql += (_table.alias && _table.name !== table.alias) ? "\"" + _table.alias + "\" " : "";
            sql += _columns.length ? "( " + _columns.join(", ") + " ) " : "";

            //TODO: Joins
            
            sql += _constraints.length ? "\n" + _constraints.join("\n") : "";

            return sql.trim();
        };
    };
})();