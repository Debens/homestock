; (function () {
    "use strict";

    var nsString = "HomeStock";
    var messagePrefix = nsString + ".Suppliers: ";
    
    var _suppliers = {};
    HomeStock.Suppliers = _suppliers

    HomeStock.Suppliers.Add = function (supplier) {
        if (_suppliers.hasOwnProperty(supplier.Name))
            console.error(messagePrefix + "Duplicate supplier ID '" + supplier.Name + "', the duplicate shall not be included");
        _suppliers[supplier.Name] = supplier;
    };
})();