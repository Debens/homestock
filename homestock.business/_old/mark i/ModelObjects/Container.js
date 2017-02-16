;(function() {
	"use strict";
	var defaults = {
	    name: "New Container Name Default"
	};

	window.Stock = function (params) {
	    var self = this;

	    params = $.extend(defaults, params);

	    self.name = ko.observable(params.name);

	    self.home = ko.obervable();

	    self.id = ko.observable();
	    self.created = ko.observable();
	}
})();
