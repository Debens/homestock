; (function() {
	"use strict";

	window.InventoryViewModel = function() {
		var self = this;
		var urlDetails = new UriHelper(window.location.href);
		//var ownerId = urlDetails.getQueryStringParameter("owner");
		//var homeId = urlDetails.getQueryStringParameter("home");
		//var containerId = urlDetails.getQueryStringParameter("container");
		//var stock = new StockManager();

		self.inventory = ko.observableArray();

		var populateInventory = function() {
			var repository = new StockRepository();
			var promise = repository.GetAll(1, 1, 1);
			promise.done(setInventory);
		};

		var setInventory = function(inventory) {
			var invDataArray = [].concat(inventory);
			self.inventory(invDataArray);
		};

		populateInventory();
	};

	//ko.applyBindings(new InventoryViewModel());
})();