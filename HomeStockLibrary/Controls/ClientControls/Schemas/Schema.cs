using System.Web.UI;
using System.Text;
using System.Collections.Generic;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;
using HomeStockLibrary.Controls.ClientControls.Base;
using HomeStockLibrary.Controls.ClientControls.Schemas.Base;

namespace HomeStockLibrary.Controls.ClientControls.Schemas
{
    [DataContract]
    public class Schema : ScriptObject, ISchema
    {
        public override string ScriptRegionID =>  "HomeStock Schemas";
        public override int? ScriptRegionPriority => 20; // TODO: Add to web.config

        [DataMember(Name = "entities"), PersistenceMode(PersistenceMode.InnerProperty)]
        public List<Entity> Entities { get; set; }

        public override string RenderScript()
        {
            var creationString = new StringBuilder();
            creationString.AppendLine("var ns = HomeStock.Import(\"Data\");");
            creationString.AppendLine("HomeStock.Schemas.Add(new ns.Schema(" + JsonAssistant.Convert(this, typeof(ISchema)) + "));");
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
