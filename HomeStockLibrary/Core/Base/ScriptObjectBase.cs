using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Exceptions;
using HomeStockLibrary.Util.Script;
using System.Web.UI;
using System.Runtime.Serialization;

namespace HomeStockLibrary.Core.Base
{
    [DataContract]
    public abstract class ScriptObjectBase : WebControlBase
    {
        public abstract string ScriptRegionID { get; }
        public abstract int? ScriptRegionPriority { get; }

        public abstract string GenerateCreationString();

        protected override void Render(HtmlTextWriter writer)
        {
            ScriptAssistant.CreateRegion(ScriptRegionID, ScriptRegionPriority);

            string creationString = GenerateCreationString();
            Validate(creationString, new HomeStockControlException(string.Format("Control '{0}', of type {1}, GenerateCreationString returned an invalid result", this.ID, this.GetType())));

            ScriptAssistant.RenderScript(new Script(creationString), ScriptRegionID);
        }
    }
}
