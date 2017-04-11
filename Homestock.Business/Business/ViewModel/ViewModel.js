; (function () {
    "use strict";

    var nsString = "Business.ViewModel", ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".: ";

    ns.Export("ViewModel", ViewModel);

    function ViewModel (params) {
        this.validate(params, "getWorkers", "eventObject", "modelBuilder", "modelBinder")
        this.validate.isFunction(params.getWorkers);

        var _getWorkers = params.getWorkers;
        var _eventObj = params.eventObject;
        var _model = ko.observable({});

        var builder = params.modelBuilder;
        var binder = params.modelBinder;
        
        _model.Evaluate = function () {
            var constructionParams = { workers: _getWorkers(), eventObject: _eventObj, viewModel: _model };
            builder.Build(constructionParams);
            binder.Bind(constructionParams);

            return _model;
        };

        return _model;
    };
})();