; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Deferred: ";

    HomeStock.Deferred = function (params) {
        var self = this;

        // TODO: expand deferred to monitor progress

        return $.Deferred();
    };
})();