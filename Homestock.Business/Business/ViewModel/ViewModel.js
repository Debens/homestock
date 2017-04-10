; (function () {
    "use strict";

    var nsString = "Business.ViewModel", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".: ";

    ns.Export("ViewModel", ViewModel);

    function ViewModel (params) {
        this.validate(params, "eventObject", "modelBuilder", "modelBinder")

        var _eventObj = params.eventObject;
        var _model = ko.observable({});

        var constructionParams = { eventObject: _eventObj, viewModel: _model };
        params.modelBuilder.Build(constructionParams);
        params.modelBinder.Bind(constructionParams);

        return _model;
    };
})();