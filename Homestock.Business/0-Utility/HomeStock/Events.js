; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Events: ";

    HomeStock.EventObj = function () {
        var self = this;

        var _eventObj = $({});

        self.eventObj = function () { return _eventObj; };

        self.On = function (eventName, callback) {
            if (eventName) {
                if (!callback || typeof callback !== "function")
                    throw messagePrefix + "Callback function is required to create trigger";
                    _eventObj.on(eventName, callback);
                }
        };

        self.Off = function (eventName) {
            if (eventName) { _eventObj.off(eventName); }
        };

        self.Trigger = function (eventName, triggerArguments) {
            if (eventName) { _eventObj.trigger(eventName, triggerArguments); }
        };
    };
})();