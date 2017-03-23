using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Data.Suppliers.Base
{
    public abstract class BaseSupplier : HomeStockScriptObject, ISupplier
    {
        protected abstract string namespaceString { get; }

        protected static readonly string ScriptRegionID = "HomeStock Data Suppliers";

        string SchemaID { get; set; }

        public override void RenderControl(HtmlTextWriter writer)
        {
            ValidateProperties();

            var creationString = new StringBuilder();
            creationString.AppendLine(string.Format("var ns = HomeStock.Import(\"{0}\");", namespaceString));
            creationString.AppendLine(string.Format("HomeStock.Suppliers.{0} = ns.Supplier({1});", this.ID, GenerateCreationString()));

            HomeStockScriptAssistant.RenderScriptTo(new HomeStockScript(creationString.ToString()), ScriptRegionID);
        }
    }
}
