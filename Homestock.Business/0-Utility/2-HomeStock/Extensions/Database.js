; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Database: ";

    var _database = openDatabase("HomeStockDB", "1.0", "HomeStock Local Database", 2 * 1024 * 1024)

    HomeStock.Database = {
        "GetConnection": function () { return _database; }
    };
})();