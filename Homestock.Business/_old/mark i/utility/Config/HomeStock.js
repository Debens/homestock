(function () {
    "use strict";

    var HomeStock = function () {
        var self = this;

        self.AttrPrefix = "HomeStock_";
        self.GetAttr = function (name) {
            return localStorage.getItem(AttrPrefix + name);
        }
        self.SetAttr = function (name, value) {
            localStorage.setItem(self.AttrPrefix + name, value);
        }
    };
})();