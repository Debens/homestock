using HomeStockLibrary.Core;
using HomeStockLibrary.Data.Schemas.Core;
using System.Collections.Generic;
using System.Web.UI;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;
using System.Text;
using HomeStockLibrary.Util.Script;
using System;

namespace HomeStockLibrary.Data.Schemas
{
    [DataContract]
    public class Schema : HomeStockScriptObject, ISchema
    {
        public override string ScriptRegionID =>  "HomeStock Schemas";
        public override int? ScriptRegionPriority => 20; // TODO: Add to web.config

        [DataMember(Name = "entities"), PersistenceMode(PersistenceMode.InnerProperty)]
        public List<Entity> Entities { get; set; }

        public override string GenerateCreationString()
        {
            var creationString = new StringBuilder();
            creationString.AppendLine("var ns = HomeStock.Import(\"Data\");");
            creationString.AppendLine("HomeStock.Schemas.Add(new ns.Schema(" + HomeStockJsonAssistant.Convert(this, typeof(ISchema)) + "));");
            return creationString.ToString();
        }

        public override void ValidateProperties()
        {
            Validate(ID, "ID");
            foreach (var entity in Entities)
                entity.ValidateProperties();
        }
    }
}
