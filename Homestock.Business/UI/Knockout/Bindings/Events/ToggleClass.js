; (function () {
    if (!ko)
        return;

    ko.bindingHandlers.toggleClass = {
        init: function (el, valueAccessor, allBindings) {
            var actionArray = ko.unwrap(valueAccessor());
            actionArray = Array.isArray(actionArray) ? actionArray : [actionArray];

            var actionElement = $(el);
            for (var index = 0; index < actionArray.length; index++) {
                let action = actionArray[index];
                let parentSelect = action.sParent;
                let childSelect = action.sChild;
                let event = action.event || "click";

                $(el).on(event, function () {
                    let actionElement = $(el);
                    actionElement = parentSelect ? actionElement.closest(parentSelect.startsWith(".") ? parentSelect : "." + parentSelect) : actionElement;
                    actionElement = childSelect ? actionElement.find(childSelect.startsWith(".") ? childSelect : "." + childSelect) : actionElement;

                    let enabled = actionElement.hasClass(action.classes.on);
                    actionElement.toggleClass(action.classes.on, !enabled);
                    if (action.classes.off)
                        actionElement.toggleClass(action.classes.off, enabled);
                });
            }
        }
    };
})();