; (function () {
    "use strict";

    var nsString = "Data", ns = HomeStock.Import(nsString);

    ns.Export("Schema", Schema);
    var messagePrefix = nsString + ".Schema: ";
   
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
            var entity = { columns: {}, name: entityObj.name, Id: { Prefix: entityObj.identityPrefix, Length: entityObj.identityLength } };

            for (var cIndex = 0; cIndex < entityObj.columns.length; cIndex++) {
                var columnObj = entityObj.columns[cIndex];
                entity.columns[columnObj.name] = { name: columnObj.name, isIdentity: (columnObj.identityColumn == true)  };
            }

            entities[entity.name] = entity;
        }
        return entities;
    };
})();