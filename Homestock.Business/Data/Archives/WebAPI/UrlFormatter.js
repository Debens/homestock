; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI";
    var ns = HomeStock.Import(nsString);
    
    var messagePrefix = nsString + ".UrlFormatter: ";

    var requiredComposeParams = [
        "url",
        "fragments",
        "constraintData"
    ];

    ns.UrlFormatter = function () {
        var self = this;

        self.Format = function (params) {
            var validation = ObjectValidator.Validate(params, requiredComposeParams);
            if (!validation.isValid)
                throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");

            var urlSegments = self.Decompose(params.url);
            var fragments = params.fragments;
            var constraintData = params.constraintData;

            var formattedUrl = "";
            for (var index = 0; index < urlSegments.length; index++) {
                formattedUrl += urlSegments[index];
                var fragment = fragments[index];
                if (!fragment)
                    break;
                var entityConstraint = constraintData[fragment.Entity];
                if (!entityConstraint)
                    break;
                var constraint = entityConstraint[fragment.IdentifierField]
                if (!constraint)
                    break;

                formattedUrl += constraint;
            }

            return formattedUrl;
        };

        self.Decompose = function (url) {
            if (!url)
                return [];
            if (typeof url !== typeof "A String")
                throw messagePrefix + "URL must be of type string to be decomposed";

            var regex = /\{\d\}/;
            return url.split(regex).filter(function (segment) { return !!segment; });
        };
    };
})();