; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Logging: ";

    var nsRoot = HomeStock.Import().__node__;

    HomeStock.Logging = {};
    HomeStock.Logging.Disable = function () { nsRoot.Logging.Enable(false); };
    HomeStock.Logging.Enable = function () { nsRoot.Logging.Enable(true); };
})();