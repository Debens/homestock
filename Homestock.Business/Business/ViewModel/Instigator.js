; (function () {
    "use strict";
    
    var nsString = "Business.ViewModel", ns = HomeStock.Import(nsString);
    var nsActionsString = "Business.ViewModel.Actions", nsActions = HomeStock.Import(nsActionsString);

    window.addEventListener("pageshow", function () {
        HomeStock.ViewModel = new ns.ViewModel({
            eventObject: HomeStock._eventObj,
            modelBuilder: new nsActions.Builder(),
            modelBinder: new nsActions.Binder()
        });
    }, false);
})();