; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Events: ";

    HomeStock.EventObj = function () {
        var self = this;

        var _eventObj = $({});

        self.eventObj = function () { return _eventObj; };

        self.on = function (eventName, callback) {
            if (eventName) 
                if (callback && typeof callback === "function")
                    _eventObj.on(eventName, callback);
        };

        self.on = function (eventName, callback) {
            if (eventName) 
                if (callback && typeof callback === "function")
                    _eventObj.one(eventName, callback);
        };

        self.off = function (eventName) {
            if (eventName) { _eventObj.off(eventName); }
        };

        self.trigger = function (eventName, triggerArguments) {
            if (eventName) { _eventObj.trigger(eventName, triggerArguments); }
        };
    };
})();