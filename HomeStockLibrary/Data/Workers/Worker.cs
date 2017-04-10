using System;
using HomeStockLibrary.Data.Workers.Base;
using HomeStockLibrary.Core;
using System.Text;
using HomeStockLibrary.Util;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Data.Workers
{
    [DataContract]
    public class Worker : HomeStockScriptObject, IWorker
    {
        public override string ScriptRegionID => "HomeStock Data Workers";
        public override int? ScriptRegionPriority => null;

        [DataMember(Name = "archiveId")]
        public string ArchiveID { get; set; }

        public override string GenerateCreationString()
        {
            var creationString = new StringBuilder();
            creationString.AppendLine("var ns = HomeStock.Import(\"Business.Workers\");");
            creationString.AppendLine(string.Format("HomeStock.Workers.Add(new ns.Worker({0}));", HomeStockJsonAssistant.Convert(this, typeof(IWorker))));
            return creationString.ToString();
        }

        public override void ValidateProperties()
        {
            Validate(ArchiveID, "ArchiveID");
        }
    }
}
