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
        protected static readonly string ScriptRegionID = "HomeStock Data Suppliers";

        public override void RenderControl(HtmlTextWriter writer)
        {
            ValidateProperties();
            HomeStockScriptAssistant.RenderScriptTo(new HomeStockScript(GenerateCreationString()), ScriptRegionID);
        }
    }
}
