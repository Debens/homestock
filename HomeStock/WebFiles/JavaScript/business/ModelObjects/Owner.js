;(function() {
	"use strict";
	var defaults = {
	    name: "New Owner Name Default"
	};

	window.Stock = function (params) {
	    var self = this;

	    params = $.extend(defaults, params);

	    self.name = ko.observable(params.name);

	    self.id = ko.observable();
	    self.created = ko.observable();
	}
})();
