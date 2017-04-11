using System.Text;
using System.Runtime.Serialization;
using HomeStockLibrary.Core.Base;

namespace HomeStockLibrary.Data.Archives.Base
{
    [DataContract]
    public abstract class BaseArchive : ScriptObjectBase, IArchive
    {
        public override string ScriptRegionID => "HomeStock Archives";
        public override int? ScriptRegionPriority => 15; // TODO: Add to web.config

        protected abstract string namespaceString { get; }

        protected abstract string CreationParameters { get; }
        
        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override string GenerateCreationString()
        {
            var creationString = new StringBuilder();
            creationString.AppendLine(string.Format("var ns = HomeStock.Import(\"{0}\");", namespaceString));
            creationString.AppendLine(string.Format("HomeStock.Archives.Add(new ns.Archive({0}));", CreationParameters));
            return creationString.ToString();
        }

        public override void ValidateProperties()
        {
            Validate(SchemaID, "SchemaID");
            Validate(CreationParameters, "CreationParameters");
        }
    }
}
