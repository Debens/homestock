using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;
using System.Runtime.Serialization;
using HomeStockLibrary.Data.Archives.Base.WebAPI;

namespace HomeStockLibrary.Data.Archives.Base
{
    [DataContract]
    public abstract class BaseArchive : HomeStockScriptObject, IArchive
    {
        protected abstract string namespaceString { get; }

        protected static readonly string ScriptRegionID = "HomeStock Data Archives";

        [DataMember(Name = "schemaId")]
        public string SchemaID { get; set; }

        public override void RenderControl(HtmlTextWriter writer)
        {
            ValidateProperties();

            var creationString = new StringBuilder();
            creationString.AppendLine(string.Format("var ns = HomeStock.Import(\"{0}\");", namespaceString));
            creationString.AppendLine(string.Format("HomeStock.Archives.Add(new ns.Archive({0}));", GenerateCreationString()));

            HomeStockScriptAssistant.RenderScriptTo(new HomeStockScript(creationString.ToString()), ScriptRegionID);
        }
    }
}
