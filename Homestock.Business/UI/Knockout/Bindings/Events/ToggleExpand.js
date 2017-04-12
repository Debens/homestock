; (function () {
    if (!ko)
        return;

    var defaultOptions = {
        duration: 500,
        easing: "linear"
    };

    ko.bindingHandlers.toggleExpand = {
        init: function (el, valueAccessor, allBindings) {
            var intialState = ko.unwrap(valueAccessor());

            var actionElement = $(el);
            var parentSelect = allBindings.get("sParent");
            var childSelect = allBindings.get("sChild");
            var options = $.extend({}, allBindings.get("options") || 400, defaultOptions, true);
            var event = allBindings.get("event") || "click";
            var actionElement = findActionElement();

            if (intialState)
                actionElement.slideDown(options);
            else
                actionElement.slideUp(options);

            $(el).on(event, function () {
                actionElement.slideToggle(options)
            });

            function findActionElement() {
                var actionElement = $(el);
                actionElement = parentSelect ? actionElement.closest(parentSelect.startsWith(".") ? parentSelect : "." + parentSelect) : actionElement;
                actionElement = childSelect ? actionElement.find(childSelect.startsWith(".") ? childSelect : "." + childSelect) : actionElement;
                return actionElement;
            };
        }
    };
})();