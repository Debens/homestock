using HomeStockLibrary.Controls.Base;
using System.Collections.Generic;
using System.Web.UI;
using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script;
using HomeStockLibrary.Util.Script.Base;
using System.Linq;

namespace HomeStockLibrary.Controls
{
    public class HomeStockScriptControl : HomeStockControlBase
    {
        private List<HomeStockScriptRegion> scriptRegions;

        public HomeStockScriptControl()
        {
            scriptRegions = new List<HomeStockScriptRegion>();
        }

        public override void RenderControl(HtmlTextWriter writer)
        {
            writer.RenderBeginTag("script");

            foreach (HomeStockScriptRegion region in scriptRegions)
            {
                writer.InnerWriter.Write("\n");
                writer.InnerWriter.Write(region.ID);
                writer.InnerWriter.Write(region.BuildScript());
            }

            writer.InnerWriter.Write("\n");

            writer.RenderEndTag();
        }

        public void AddScript (HomeStockScriptRegion scriptRegion)
        {
            scriptRegions.Add(scriptRegion);
            scriptRegions.OrderBy(s => s.Priority).ThenBy(s => s.ID);
        }
    }
}
