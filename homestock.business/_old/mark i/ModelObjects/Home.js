;(function() {
	"use strict";
	var defaults = {
	    name: "New Home Name Default",
	};

	window.Stock = function (params) {
	    var self = this;

	    params = $.extend(defaults, params);

	    self.name = ko.observable(params.name);

	    self.owner = ko.obervable();

	    self.id = ko.observable();
	    self.created = ko.observable();
	}
})();
