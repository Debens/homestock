; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SQLRunner: ";

    ns.SqlRunner = {
        "Run": function (sql) {
            var executingSql = HomeStock.Deferred();
            if (!sql)
                return executingSql.resolve().promise();
            if (typeof sql !== typeof "String")
                throw messagePrefix + "Cannot run sql statement of type '" + typeof sql + "'";

            var success = function () {
                console.log(messagePrefix + "\n" + sql);
                executingSql.resolve();
            };

            var error = function (transaction, error) {
                error.message = messagePrefix + "Failed to run query \n" + sql + "\n" + error.message;
                console.error(error.message);
                executingSql.reject(transaction, error);
            };

            var database = HomeStock.Database.GetConnection()
            var sqlExecuting =  database.transaction(function (tx) {
                tx.executeSql(sql, null, success, error);
            });

            return executingSql.promise();
        }
    };
})();