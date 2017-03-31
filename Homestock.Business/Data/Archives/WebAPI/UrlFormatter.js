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

    ns.UrlFormatter = {
        Format : function (params) {
            var validation = ObjectValidator.Validate(params, requiredComposeParams);
            if (!validation.isValid)
                throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");

            var urlSegments = ns.UrlFormatter.Decompose(params.url);
            var fragments = params.fragments;
            var constraintData = params.constraintData || {};

            var formattedUrl = "";
            for (var index = 0; index < urlSegments.length; index++) {
                var fragment = fragments[index];
                if (!fragment)
                    break;
                var entityConstraint = constraintData[fragment.entity];
                if (!entityConstraint)
                    break;

                formattedUrl += urlSegments[index];

                var constraint = entityConstraint[fragment.identifierField]
                if (!constraint)
                    break;

                formattedUrl += constraint;
            }

            return formattedUrl;
        },
        Decompose : function (url) {
            if (!url)
                return [];
            if (typeof url !== typeof "A String")
                throw messagePrefix + "URL must be of type string to be decomposed";

            var regex = /\{\d\}/;
            return url.split(regex).filter(function (segment) { return !!segment; });
        }
    };
})();