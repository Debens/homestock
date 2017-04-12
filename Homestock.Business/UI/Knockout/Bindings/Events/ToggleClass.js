; (function () {
    if (!ko)
        return;

    ko.bindingHandlers.toggleClass = {
        init: function (el, valueAccessor, allBindings) {
            var classes = format(ko.unwrap(valueAccessor()));

            var actionElement = $(el);
            var parentSelect = allBindings.get("sParent");
            var childSelect = allBindings.get("sChild");
            var event = allBindings.get("event") || "click";

            $(el).on(event, function () {
                var actionElement = $(el);
                actionElement = parentSelect ? actionElement.closest(parentSelect.startsWith(".") ? parentSelect : "." + parentSelect) : actionElement;
                actionElement = childSelect ? actionElement.find(childSelect.startsWith(".") ? childSelect : "." + childSelect) : actionElement;

                var enabled = actionElement.hasClass(classes.on);
                actionElement.toggleClass(classes.on, !enabled);
                if (classes.off)
                    actionElement.toggleClass(classes.off, enabled);
            });
        }
    };

    function format(toggleClasses) {
        if (typeof toggleClasses === "string")
            return { on: toggleClasses };
        else
            return toggleClasses;
    };
})();