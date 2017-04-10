; (function () {
    "use strict";

    var nsString = "Util.SQL";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Runner: ";

    ns.Export("Runner", Runner);

    function Runner() {
        var self = this;

        self.Run = function (sql) {
            var executingSql = new HomeStock.Deferred();
            if (!sql)
                return executingSql.resolve().promise();
            if (typeof sql !== typeof "String")
                throw messagePrefix + "Cannot run sql statement of type '" + typeof sql + "'";

            var self = this; // Needed as object scope is lost in success/error functions
            var success = function () {
                self.info(messagePrefix + "\n" + sql);
                executingSql.resolve();
            };

            var error = function (transaction, error) {
                var errorMessage = messagePrefix + "Failed to run query \n" + sql + "\n" + error.message;
                self.error(errorMessage);
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