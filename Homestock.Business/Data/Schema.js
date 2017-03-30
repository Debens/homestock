; (function () {
    "use strict";

    var nsString = "Data.Archives.Core";
    var ns = HomeStock.Import(nsString);

    ns.Schema = Schema;
   
    var messagePrefix = nsString + ".Schema: ";

    var requiredParams = [
        "id",
        "entities"
    ];

    function Schema (params) {
        var validation = ObjectValidator.Validate(params, requiredParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;


        self.Id = params.id;
        self.Entities = buildEntities(params.entities);

        self["Contains"] = function (entity) {
            return Object.keys(self.Entities).indexOf(entity) >= 0;
        }; 
    };

    function buildEntities(entityArray) {
        var entities = {};
        for (var eIndex = 0; eIndex < entityArray.length; eIndex++) {
            var entityObj = entityArray[eIndex];
            var entity = { Columns: {}, Name: entityObj.name };

            for (var cIndex = 0; cIndex < entityObj.columns.length; cIndex++) {
                var columnObj = entityObj.columns[cIndex];
                entity.Columns[columnObj.name] = { Name: columnObj.name };
            }

            entities[entity.Name] = entity;
        }
        return entities;
    };
})();