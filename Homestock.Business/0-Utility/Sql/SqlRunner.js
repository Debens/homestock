; (function () {
    "use strict";

    var nsString = "Util.Sql";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SQLRunner: ";

    ns.Export("SqlRunner", SqlRunner);

    function SqlRunner() {
        var self = this;

        self.Run = function (sql) {
            var executingSql = new HomeStock.Deferred();
            if (!sql)
                return executingSql.resolve().promise();
            if (typeof sql !== typeof "String")
                throw messagePrefix + "Cannot run sql statement of type '" + typeof sql + "'";

            var self = this; // Needed as object scope is lost in success/error functions
            var success = function () {
                self.log(messagePrefix + "\n" + sql);
                executingSql.resolve();
            };

            var error = function (transaction, error) {
                error.message = messagePrefix + "Failed to run query \n" + sql + "\n" + error.message;
                self.error(error.message);
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