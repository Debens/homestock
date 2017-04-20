; (function () {
    "use strict";

    var nsString = "Util.KO", ns = HomeStock.Import(nsString);
    
    ns.Export("isObservableArray", isObservableArray);

    function isObservableArray (obj) {
        return ko.isObservable(obj) && !(obj.destroyAll === undefined);
    }
})();