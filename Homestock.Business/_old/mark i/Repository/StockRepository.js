;(function() {
	"use strict";

	window.StockRepository = function(currentOwner, currentHome, currentContainer) {
		var self = this;
		var currentOwnerId = currentOwner;
		var currentHomeId = currentHome;
		var currentContainerId = currentContainer;
		self.create = function(stock){};
		self.update = function(stock){};
		self.get = function(id){};
		self.delete = function(id){};
	};
	// window.StockRepository = function() {
	// 	var self = this;
	// 	var baseUrl = function(ownerId, homeId, containerId) {
	// 		if(!ownerId || !homeId || !containerId) 
	// 			throw "Failed to build base repository Url due to missing components";
	// 		return ApplicationSettings.RepositorySettings.baseUrl() + "/owner/" + ownerId + "/home/" + homeId + "/container/" + containerId + "/stock";
	// 	};
	// 	var ajax = new AjaxHelper();

	// 	self.Create = function(stock) {
	// 		if(!stock)
	// 			throw "Must provide an stock to create";
	// 		return ajax.Request(baseUrl(stock.container.home.owner.id, stock.container.home.id, stock.container.id), RequestType.post, stock);
	// 	};

	// 	self.GetAll = function(ownerId, homeId, containerId) {
	// 		return ajax.Request(baseUrl(ownerId, homeId, containerId), RequestType.get);
	// 	};

	// 	self.Get = function(ownerId, homeId, containerId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId, homeId, containerId) + "/" + id;
	// 		return ajax.Request(url, RequestType.get);
	// 	};

	// 	self.Update = function(stock) {
	// 		if(!stock)
	// 			throw "Must provide an stock to update";
	// 		if(!stock.id)
	// 			throw "Cannot update an stock without their Id"
	// 		var url = baseUrl(stock.container.home.owner.id, stock.container.home.id, stock.container.id) + "/" + stock.id;
	// 		return ajax.Request(ulr, RequestType.update, owner);
	// 	};

	// 	self.Delete = function(ownerId, homeId, containerId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId, homeId, containerId) + "/" + id;
	// 		return ajax.Request(url, RequestType.delete);
	// 	};
	// };
})();