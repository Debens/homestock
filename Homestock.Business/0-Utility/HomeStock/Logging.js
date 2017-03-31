; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Logging: ";

    HomeStock.Log = function (log) {
        console.log(log)
    };
    HomeStock.Info = function (info) {
        console.info(info)
    };
    HomeStock.Debug = function (debug) {
        console.debug(debug)
    };
    HomeStock.Warn = function (warning) {
        console.warn(warning)
    };
    HomeStock.Error = function (error) {
        console.error(error)
    };
})();