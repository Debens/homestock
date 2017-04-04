; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Archives: ";
    
    var _archives = {};
    HomeStock.Archives = _archives

    HomeStock.Archives.Add = function (archive) {
        if (_archives.hasOwnProperty(archive.Name))
            console.error(messagePrefix + "Duplicate archive ID '" + archive.Name + "', the duplicate shall not be included");
        _archives[archive.Name] = archive;
    };
})();