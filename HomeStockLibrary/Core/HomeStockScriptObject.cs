using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Exceptions;
using HomeStockLibrary.Util.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Core
{
    [DataContract]
    public abstract class HomeStockScriptObject : HomeStockControlBase
    {
        public abstract string ScriptRegionID { get; }
        public abstract int? ScriptRegionPriority { get; }

        public abstract string GenerateCreationString();

        protected override void Render(HtmlTextWriter writer)
        {
            HomeStockScriptAssistant.CreateRegion(ScriptRegionID, ScriptRegionPriority);

            string creationString = GenerateCreationString();
            Validate(creationString, new HomeStockControlException(string.Format("Control '{0}', of type {1}, GenerateCreationString returned an invalid result", this.ID, this.GetType())));

            HomeStockScriptAssistant.RenderScript(new HomeStockScript(creationString), ScriptRegionID);
        }
    }
}
