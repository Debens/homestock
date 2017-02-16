; (function() {
	"use strict"

	window.HomeStockIFramPageNavigator = function () {
		var self = this;

		var iFrame = document.querySelector('#iframe');

		self.NavigateTo = function(url) {
			if(!url)
				throw "A Url has not be given for iFrame navigation"
			iFrame.src = url;
		}
	}
})();