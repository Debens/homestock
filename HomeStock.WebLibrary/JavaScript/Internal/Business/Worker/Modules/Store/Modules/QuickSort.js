; (function () {
    "use strict";

    var nsString = "Business.Worker.Modules.Store.Modules", ns = HomeStock.Import(nsString);
    var nsKOString = "Util.KO", nsKO = HomeStock.Import(nsKOString);
    var messagePrefix = nsString + ".QuickSort: ";

    ns.Export("QuickSort", QuickSort);

    function QuickSort(params) {
        this.validate(params, "store");
        var self = params.store;

        self.SortBy = function (fieldName, order) {
            if (!fieldName)
                return;
            // TODO: Validate FieldName againt all fields
            order = order ? order.toString().toLowerCase() : "asc";
            ko.unwrap(self).sort(function (a, b) {
                if (a.Entries[fieldName].toString() < b.Entries[fieldName].toString()) return order === "desc" ? 1 : -1;
                if (a.Entries[fieldName].toString() > b.Entries[fieldName].toString()) return order === "desc" ? -1 : 1;
                return 0;
            })
            if (nsKO.isObservableArray(self))
                self.valueHasMutated();
        };
    };
})();