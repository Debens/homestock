; (function () {
    "use strict";

    var nsString = "Util";
    var ns = HomeStock.Import(nsString);

    var ALPHABET = '23456789abdegjkmnpqrvwxyz';
    var ID_LENGTH = 8;

    function GUID (prefix) {
        var guid = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            guid += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return prefix ? prefix.toString() + "-" + guid : guid;
    };

    function UUID (prefix) { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return prefix ? prefix.toString() + "-" + uuid : uuid;
    };

    ns.Export("GUID", GUID);
    ns.Export("UUID", UUID);
})();