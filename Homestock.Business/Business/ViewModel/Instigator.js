; (function () {
    "use strict";
    
    var nsString = "Business.ViewModel", ns = HomeStock.Import(nsString);
    var nsActionsString = "Business.ViewModel.Actions", nsActions = HomeStock.Import(nsActionsString);

    window.addEventListener("pageshow", function () {
        HomeStock.ViewModel = new ns.ViewModel({
            getWorkers: function () {
                var workerObj = {};
                for (var index = 0; index < Object.keys(HomeStock.Workers).length; index++) {
                    var worker = HomeStock.Workers[Object.keys(HomeStock.Workers)[index]];
                    if (typeof worker === "object")
                        workerObj[worker.name] = worker;
                }
                return workerObj;
            },
            eventObject: HomeStock._eventObj,
            modelBuilder: new nsActions.Builder(),
            modelBinder: new nsActions.Binder({ rootNode: document.body })
        });
        HomeStock.ViewModel.Evaluate();
    }, false);
})();