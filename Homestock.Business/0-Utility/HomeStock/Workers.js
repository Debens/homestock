; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Workers: ";

    var _workers = {};
    HomeStock.Workers = _workers;

    HomeStock.Workers.Add = function (worker) {
        if (_workers.hasOwnProperty(worker.Name))
            console.error(messagePrefix + "Duplicate worker ID '" + worker.Name + "', the duplicate shall not be included");
        _workers[worker.Name] = worker;
    };
})();