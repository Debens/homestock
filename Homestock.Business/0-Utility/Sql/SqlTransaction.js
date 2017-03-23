; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SqlTransaction: ";

    var Keywords = {
        create: "CREATE",
        drop: "DROP",
        table: "TABLE",
        select: "SELECT",
        insert: "INSERT INTO",
        update: "UPDATE",
        delete: "DELETE",
        from: "FROM",
        where: "WHERE",
        groupby: "GROUP BY",
        orderby: "ORDER BY",
        join: {
            inner: "INNER JOIN",
            left: "LEFT JOIN",
            right: "RIGHT JOIN"
        },
        limit: "LIMIT",
        offset: "OFFSET",
        on: "ON",
        set: "SET",
        values: "VALUES",
        if: "IF",
        not: "NOT",
        exists: "EXISTS"
    }

    ns.SqlTransaction = function (params) {
        var self = this;

        var _operation = "";
        var _table = "";
        var _columns = [];
        var _joins = [];
        var _constraints = [];

        self.toString = function () { return buildStatement() };

        self.Run = function () {
            var sql = self.toString();
            self.Clear();
            if (!sql)
                console.warn(messagePrefix + "Attempting to run empty SQL resulting no effect");

            return sql ? ns.SqlRunner.Run(sql) : HomeStock.Deferred().resolve().promise();
        };

        self.Clear = function () {
            _operation = "";
            _table = "";
            _columns = [];
            _joins = [];
            _constraints = [];
        };

        self["CreateDB"] = function () { /*TODO*/ };
        self["DropDB"] = function () { /*TODO*/ };

        self["CreateTable"] = function (tableName, columnNames) {
            if (tableName) {
                if (!columnNames || !Array.isArray(columnNames) || !columnNames.length)
                    throw messagePrefix + "Cannot create table '" + tableName + "' without any columns";

                _operation = Keywords.create + " " + Keywords.table;
                _table = { name: tableName };
                _columns = columnNames;
            }
            return self;
        };
        self["AleterTable"] = function () { /*TODO*/ };
        self["DropTable"] = function (tableName) {
            if (tableName) {
                _operation = Keywords.drop + " " + Keywords.table;
                _table = { name: tableName };
            }
            return self;
        };

        self["Uniquely"] = function () { _operation += " " + Keywords.if + " " + Keywords.not + " " + Keywords.exists; return self; };
            
        self["Select"] = function () { _operation = Keywords.select; return self; };
        self["Delete"] = function () { _operation = Keywords.delete; return self; };
        self["Update"] = function (columnNames, columnValues) {
            if (!Array.isArray(columnNames))
                throw messagePrefix + "Cannot update without array of column names";
            if (!Array.isArray(columnValues))
                throw messagePrefix + "Cannot update without array of column values";
            if (columnNames.length != columnValues.length)
                throw messagePrefix + "Update column names/values mismatch";

            if (columnNames.length) {
                var updates = [];
                for (var index = 0; index < columnNames.length; index++) {
                    updates.push(columnNames[index] + " = " + columnValues[index])
                }
                _constraints.push(Keywords.set + " " + updates.join(", "));
            }

            return self;
        };
        self["Insert"] = function (columnNames, columnValues) {
            if (!Array.isArray(columnNames))
                throw messagePrefix + "Cannot update without array of column names";
            if (!Array.isArray(columnValues))
                throw messagePrefix + "Cannot update without array of column values";
            if (columnNames.length != columnValues.length)
                throw messagePrefix + "Update column names/values mismatch";

            _operation = Keywords.insert;
            _table = { name: "( " + columnNames.join(", ") + " )" };
            _constraints.push(Keywords.values + " ( '" + columnValues.join("', '") + "' )");

            return self;
        };
        self["Into"] = function (tableName) {
            if (tableName) 
                _table.name = tableName + " " + _table.name;
            
            return self;
        };

        self["From"] = function (tableName, tableAlias) { _table = { name: tableName, alias: tableAlias }; return self; };

        self["Where"] = function (whereClause) { if (whereClause) { _constraints.push(Keywords.where + " " + whereClause); } return self; };
        self["GroupBy"] = function (groupClause) { if (groupClause) { _constraints.push(Keywords.groupby + " " + groupClause); } return self; };
        self["OrderBy"] = function (orderClause) { if (orderClause) { _constraints.push(Keywords.orderby + " " + orderClause); } return self; };
        self["Limit"] = function (count, offset) {
            if (count) {
                var constraint = Keywords.limit + " " + count;
                if (offset || offset == 0)
                    constraint += " " + Keywords.offset + " " + offset;
                _constraints.push(constraint);
            }
            return self;
        };

        self["InnerJoin"] = function () { /*TODO*/ };
        self["LeftJoin"] = function () { /*TODO*/ };
        self["RightJoin"] = function () { /*TODO*/ };

        function buildStatement() {
            var sql = "";

            if(_operation)
                sql += _operation + " ";
            if(_table.name)
                sql += _table.name + " ";
            if (_table.alias && _table.name != table.alias)
                sql += "\"" + _table.alias + "\" "

            if(_columns.length)
                sql += "( " + _columns.join(", ") + " ) ";

            //TODO: Joins

            if(_constraints.length)
                sql += "\n" + _constraints.join("\n");

            return sql.trim();
        };
    };
})();