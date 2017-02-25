;(function() {
	"use strict";
	var defaults = {
		name: "New Stock Name Default",
		expiry: "1994-04-13",
		detail: "New Detials Default",
		tags: []
	};

	window.Stock = function(params) {
		var self = this;

		params = $.extend(defaults, params);

		self.name = ko.observable(params.name);
		self.expiry = ko.observable(params.expiry);
		self.detail = ko.observable(params.detail);
		self.tags = ko.observableArray(params.tags);

		self.id = ko.observable();
		self.created = ko.observable();
		self.container = ko.observable();

		self.formattedTags = ko.computed(function () {
			var tagString = "Tags";
			for (var tagIndex in self.tags()) {
			    var tagPrefix = tagIndex > 0 ? "," : ":";
			    tagString += tagPrefix + " " + self.tags()[tagIndex];
			}
			return tagString;
		});
	}
})();