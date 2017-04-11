using System.Text;
using System.Runtime.Serialization;
using HomeStockLibrary.Controls.ClientControls.Base;

namespace HomeStockLibrary.Controls.ClientControls.Archives.Base
{
    [DataContract]
    public abstract class BaseArchive : ScriptObject, IArchive
    {
        public override string ScriptRegionID => "HomeStock Archives";
        public override int? ScriptRegionPriority => 15; // TODO: Add to web.config

        protected abstract string namespaceString { get; }

        protected abstract string CreationParameters { get; }
        
        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override string RenderScript()
        {
            var script = new StringBuilder();
            script.AppendLine(string.Format("var ns = HomeStock.Import(\"{0}\");", namespaceString));
            script.AppendLine(string.Format("HomeStock.Archives.Add(new ns.Archive({0}));", CreationParameters));
            return script.ToString();
        }

        public override void ValidateProperties()
        {
            Validate(SchemaID, "SchemaID");
            Validate(CreationParameters, "CreationParameters");
        }
    }
}
