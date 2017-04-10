; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Workers: ";

    var _workers = {};
    HomeStock.Workers = _workers;

    HomeStock.Workers.Add = function (worker) {
        if (_workers.hasOwnProperty(worker.name))
            HomeStock.error(messagePrefix + "Duplicate worker ID '" + worker.name + "', the duplicate shall not be included");
        _workers[worker.name] = worker;
    };
})();