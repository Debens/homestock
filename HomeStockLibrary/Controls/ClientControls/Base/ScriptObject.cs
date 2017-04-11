using System.Runtime.Serialization;
using System.Web.UI;
using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Exceptions;
using HomeStockLibrary.Util.Script;

namespace HomeStockLibrary.Controls.ClientControls.Base
{
    [DataContract]
    public abstract class ScriptObject : WebControlBase
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