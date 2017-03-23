; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SQLRunner: ";

    ns.SqlRunner = {
        "Run": function (sql) {
            if (!sql)
                return HomeStock.Deferred().resolve().promise();
            if (typeof sql !== typeof "String")
                throw messagePrefix + "Cannot run sql statement of type '" + typeof sql + "'";

            var success = function () {
                console.log(messagePrefix + "\n" + sql);
            };

            var error = function (transaction, error) {
                console.error(messagePrefix + " Failed to run query \n" + sql + "\n" + error.message);
            };

            var database = HomeStock.Database.GetConnection()
            var sqlExecuting =  database.transaction(function (tx) {
                tx.executeSql(sql, null, success, error);
            });
        }
    };
})();