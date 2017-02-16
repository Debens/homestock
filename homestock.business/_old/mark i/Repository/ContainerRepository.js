;(function() {
	"use strict";

	window.ContainerRepository = function(currentOwner, currentHome) {
		var self = this;
		var currentOwnerId = currentOwner;
		var currentHomeId = currentHome;
		self.Inventory = new StockRepository(currentOwner, currentHome, currentContainer);
		self.create = function(container){};
		self.update = function(container){};
		self.get = function(id){};
		self.delete = function(id){};
	};
	// window.ContainerRepository = function() {
	// 	var self = this;
	// 	var baseUrl = function(ownerId, homeId) {
	// 		if(!ownerId || !homeId) 
	// 			throw "Failed to build base repository Url due to missing components";
	// 		return ApplicationSettings.RepositorySettings.baseUrl() + "/owner/" + ownerId + "/home/" + homeId + "/container";
	// 	};
	// 	var ajax = new AjaxHelper();

	// 	self.Create = function(container) {
	// 		if(!container)
	// 			throw "Must provide an container to create";
	// 		return ajax.Request(baseUrl(container.home.owner.id, container.home.id), RequestType.post, container);
	// 	};

	// 	self.GetAll = function(ownerId, homeId) {
	// 		return ajax.Request(baseUrl(ownerId, homeId), RequestType.get);
	// 	};

	// 	self.Get = function(ownerId, homeId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId, homeId) + "/" + id;
	// 		return ajax.Request(url, RequestType.get);
	// 	};

	// 	self.Update = function(container) {
	// 		if(!container)
	// 			throw "Must provide an container to update";
	// 		if(!container.id)
	// 			throw "Cannot update an container without their Id"
	// 		var url = baseUrl(container.home.owner.id, container.home.id) + "/" + container.id;
	// 		return ajax.Request(ulr, RequestType.update, owner);
	// 	};

	// 	self.Delete = function(ownerId, homeId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId, homeId) + "/" + id;
	// 		return ajax.Request(url, RequestType.delete);
	// 	};
	// };
})();