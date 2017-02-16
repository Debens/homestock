;(function() {
	"use strict";

	window.HomeRepository = function(currentOwner) {
		var self = this;
		var currentOwnerId = currentOwner;
		self.Containers = new ContainerRepository(currentOwner, currentHome);
		self.create = function(home){};
		self.update = function(home){};
		self.get = function(id){};
		self.delete = function(id){};
	};
	// window.HomeRepository = function() {
	// 	var self = this;
	// 	var baseUrl = function(ownerId) {
	// 		if(!ownerId) 
	// 			throw "Failed to build base repository Url due to missing components";
	// 		return ApplicationSettings.RepositorySettings.baseUrl() + "/owner/" + ownerId + "/home";
	// 	};
	// 	var ajax = new AjaxHelper();

	// 	self.Create = function(home) {
	// 		if(!home)
	// 			throw "Must provide an home to create";
	// 		return ajax.Request(baseUrl(home.owner.id), RequestType.post, home);
	// 	};

	// 	self.GetAll = function(ownerId) {
	// 		return ajax.Request(baseUrl(ownerId), RequestType.get);
	// 	};

	// 	self.Get = function(ownerId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId) + "/" + id;
	// 		return ajax.Request(url, RequestType.get);
	// 	};

	// 	self.Update = function(home) {
	// 		if(!home)
	// 			throw "Must provide an home to update";
	// 		if(!home.id)
	// 			throw "Cannot update an home without their Id"
	// 		var url = baseUrl(home.owner.id) + "/" + home.id;
	// 		return ajax.Request(ulr, RequestType.update, owner);
	// 	};

	// 	self.Delete = function(ownerId, id) {
	// 		if(!id)
	// 			throw "Must provide an Id";
	// 		var url = baseUrl(ownerId) + "/" + id;
	// 		return ajax.Request(url, RequestType.delete);
	// 	};
	// };
})();