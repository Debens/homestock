; (function () {
    if (!ko)
        return;

    var defaultOptions = {
        duration: 400,
        easing: "linear"
    };

    ko.bindingHandlers.toggleExpand = {
        init: function (el, valueAccessor) {
            var action = ko.unwrap(valueAccessor());

            var actionElement = $(el);
            var parentSelect = action.sParent;
            var childSelect = action.sChild;
            var options = $.extend({}, action.options, defaultOptions, true);
            var event = action.event || "click";
            var actionElement = findActionElement();

            if (action.open)
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