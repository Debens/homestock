; (function () {
    "use strict";

    var nsString = "Business.Worker.Modules.Query", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".SQLSpec: ";

    ns.Export("SQLSpec", SQLSpec);

    var specTypes = ["Where", "Order", "Group", "Limit"];

    function SQLSpec (params) {
        this.validate(params, "type");
        var base = this;
        if (specTypes.indexOf(params.type) < 0) {
            this.error(messagePrefix + params.type + " does not match one of the supported types: '" + specTypes.join("', '") + "'");
            return;
        }
        
        var self = function () {
            if (arguments.length) {
                var newSpec = arguments[0];
                self._specs = [newSpec];
            }
            return buildSpec();
        };
        self._specs = [];

        self.Append = function (spec, combinator) {
            if (!spec)
                return;

            if (self._specs.length) {
                if (!combinator) {
                    this.error(messagePrefix + "Cannot append an exisiting spec without a combination operator");
                    return;
                }
                spec = " " + combinator + " " + spec;
            }
            self._specs.push(spec);
            return self();
        }.bind(base);

        var buildSpec = function () {
            return self._specs.join("");
        };

        return self;
    };
})();