;(function() {
	"use strict";
	
	window.OwnerRepository = function() {
		var self = this;
		var baseUrl = function() {
			return ApplicationSettings.RepositorySettings.baseUrl() + "/owner";
		};
		var ajax = new AjaxHelper();

		self.Create = function(owner) {
			if(!owner)
				throw "Must provide an owner to create";
			return ajax.Request(baseUrl(), RequestType.post, owner);
		};

		self.GetAll = function() {
			return ajax.Request(baseUrl(), RequestType.get);
		};

		self.Get = function(id) {
			if(!id)
				throw "Must provide an Id";
			var url = baseUrl() + "/" + id;
			return ajax.Request(url, RequestType.get);
		};

		self.Update = function(owner) {
			if(!owner)
				throw "Must provide an owner to update";
			if(!owner.id)
				throw "Cannot update an owner without their Id"
			var url = baseUrl() + "/" + owner.id;
			return ajax.Request(ulr, RequestType.update, owner);
		};

		self.Delete = function(id) {
			if(!id)
				throw "Must provide an Id";
			var url = baseUrl() + "/" + id;
			return ajax.Request(url, RequestType.delete);
		};
	};
})();