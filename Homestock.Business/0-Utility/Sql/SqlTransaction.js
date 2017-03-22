; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SqlTransaction: ";

    ns.SqlTransaction = SqlTransaction;

    var Keywords = {
        create: "CREATE",
        drop: "DROP",
        table: "TABLE",
        select: "SELECT",
        insert: "INSERT",
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
        on: "ON"
    }

    var SqlTransaction = function (params) {
        var self = this;

        var _operation = "";
        var _table = "";
        var _columns = [];
        var _joins = [];
        var _constraints = [];

        self.toString = function () { return buildStatement() };

        self.Run = function () {
            var sql = self.toString();
            return sql ? ns.SqlRunner.Run(sql) : HomeStock.Deferred().resolve().promise();
        };

        self.Clear = function () {
            _operation = "";
            _table = "";
            _columns = [];
            _joins = [];
            _constraints = [];
        };

        self["CreateDB"] = function () { };
        self["DropDB"] = function () { };

        self["CreateTable"] = function () { };
        self["DropTable"] = function () { };

        self["Select"] = function () { };
        self["Update"] = function () { };
        self["Insert"] = function () { };
        self["Delete"] = function () { };

        self["From"] = function (tableName, tableAlias) { _table = { table: tableName, alias: tableAlias }; return self; };

        self["Where"] = function (whereClause) { if (whereClause) { _constraints.push(Keywords.offset + " " + whereClause); } return self; };
        self["GroupBy"] = function (groupClause) { if (groupClause) { _constraints.push(Keywords.offset + " " + groupClause); } return self; };
        self["OrderBy"] = function (orderClause) { if (orderClause) { _constraints.push(Keywords.offset + " " + orderClause); } return self; };
        self["Limit"] = function (count, offset) {
            if (count) {
                var constraint = Keywords.limit + " " + count;
                if (offset || offset == 0)
                    constraint += " " + Keywords.offset + " " + offset;
                _constraints.push(constraint);
            }
            return self;
        };

        self["InnerJoin"] = function () { };
        self["LeftJoin"] = function () { };
        self["RightJoin"] = function () { };

        function buildStatement() {

        };
    };
})();