; (function() {
	"use strict"
	window.RequestType = {
		get: "GET",
		post: "POST",
		put: "PUT",
		delete: "DELETE",
		options: "OPTIONS"
	};

	window.AjaxHelper = function() {
		var self = this;

		self.Request = function(url, type, data) {
			if(!url)
				throw "Url was not passed as is required";

			var promise = $.ajax({
				type: type,
				url: url,
				data: data,
                dataType: "text",
                xhrFields: {
                    withCredentials: true
                }
			});
			return promise;
		}
	}
})();