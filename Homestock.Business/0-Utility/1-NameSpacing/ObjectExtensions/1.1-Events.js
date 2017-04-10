; (function () {
    "use strict";

    window.ns = window.ns || {};
    window.ns.ObjExtensions = window.ns.ObjExtensions || {};

    window.ns.ObjExtensions.Events = function (prototype, ns) {
        if (!prototype)
            return;
        
        prototype._eventObj = $({});

        prototype.one = function (eventName, callback) {
            if (eventName)
                if (callback && typeof callback === "function")
                    prototype._eventObj.one(eventName, callback);
        };

        prototype.on = function (eventName, callback) {
            if (eventName)
                if (callback && typeof callback === "function")
                    prototype._eventObj.on(eventName, callback);
        };

        prototype.off = function (eventName) {
            if (eventName) { prototype._eventObj.off(eventName); }
        };

        prototype.trigger = function (eventName, triggerArguments) {
            if (eventName) { prototype._eventObj.trigger(eventName, triggerArguments); }
        };
    };
})();