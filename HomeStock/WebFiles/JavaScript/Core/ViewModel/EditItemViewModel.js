; (function() {
	//"use strict";

    window.EditItemViewModel = EditItemViewModel;
	function EditItemViewModel() {
		var self = this;

		// {name: "Sample Item Name", expiryDate: "1994-04-13", detail: "Sample Detail"}
		self.Item = ko.observable(new Stock());

		// ko.observable({ name: ko.observable("Sample Item Name"), expiryDate: ko.observable("1994-04-13"), detail: ko.observable("Sample Detail"), tags: ko.observableArray([]) });
		// self.Item().formattedTags = ko.computed(function () {
		// 	var tagString = "Tags";
		// 	for (var tagIndex in self.Item().tags()) {
		// 	    var tagPrefix = tagIndex > 0 ? "," : ":";
		// 	    tagString += tagPrefix + " " + self.Item().tags()[tagIndex];
		// 	}
		// 	return tagString;
		// });

		self.pushTag = function (data, event) {
		    var target = event.target || event.srcElement;
		    if (target.nodeType == 3) // defeat Safari bug
		        target = target.parentNode;

		    if (elementIsSelected(target)) {
		        target.className = target.className.replace(target.className.replace("selected", "") ? " selected" : "selected", "");
		        self.Item().tags.pop(target.innerHTML);
		    } else {
		        target.className += target.className ? ' selected' : 'selected';
		        self.Item().tags.push(target.innerHTML);
		    }
		}

		self.Load = function () {
			var UriHelper = new UriHelper(window.location);
			var recordOptions = UriHelper.getRecordOptions();
		};

		var elementIsSelected = function (element) {
		    var selectedClassName = "selected";
		    return element.className.indexOf(selectedClassName) >= 0;
		}
	};

	ko.applyBindings(new EditItemViewModel());
})();