; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Archives: ";
    
    var _archives = {};
    HomeStock.Archives = _archives

    HomeStock.Archives.Add = function (archive) {
        if (_archives.hasOwnProperty(archive.name))
            HomeStock.error(messagePrefix + "Duplicate archive ID '" + archive.name + "', the duplicate shall not be included");
        _archives[archive.name] = archive;
    };
})();