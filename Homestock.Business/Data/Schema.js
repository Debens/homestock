; (function () {
    "use strict";

    var nsString = "Data";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".Schema: ";

    ns.Export("Schema", Schema);
   
    function Schema (params) {
        this.validate(params, "id", "entities");
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