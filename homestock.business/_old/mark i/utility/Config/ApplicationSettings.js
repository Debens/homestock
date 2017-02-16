; (function() {
	"use strict";

	window.ApplicationSettings = {
		RepositorySettings: {
			hostApiUrl: "http://localhost/HSAPI",
			baseUrl: function() { return ApplicationSettings.RepositorySettings.hostApiUrl + "/api" }
		}
	}
})();