; (function () {
    "use strict";

    window.ns = window.ns || {};
    window.ns.ObjExtensions = window.ns.ObjExtensions || {};

    window.ns.ObjExtensions.Valiadation = function (prototype, ns) {
        if (!prototype)
            return;

        var messagePrefix = prototype._fullPath + ".validate: ";

        prototype.validate = function (s, p) {
            var args = Array.from(arguments);
            var source = args[0];
            var properties = [].concat.apply([], args.slice(1)); // allows either array or listed arguments

            for (var index = 0; index < properties.length; index++) {
                var propertyStack = properties[index].split(".");

                var property = propertyStack.splice(0, 1);
                if (!source)
                    throw messagePrefix + "Missing source object to validate";
                else if (!source.hasOwnProperty(property))
                    throw messagePrefix + "Object missing property '" + property + "'";
                else if (propertyStack.length)
                    prototype.validate(source[property], propertyStack);
            }

            return true;
        };

        prototype.validate.isFunction = function (func) {
            return typeof func === "function";
        }

        prototype.validate.isString = function (string) {
            return typeof string === "string";
        }

        prototype.validate.isNumber = function (number) {
            return Number.isFinite(parseInt(number, 10))
        }

        prototype.validate.isArray = function (array) {
            return Array.isArray(array);
        }
    };
})();