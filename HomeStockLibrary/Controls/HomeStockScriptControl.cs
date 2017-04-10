using HomeStockLibrary.Controls.Base;
using System.Collections.Generic;
using System.Web.UI;
using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script;
using HomeStockLibrary.Util.Script.Base;
using System.Linq;
using System;
using HomeStockLibrary.Exceptions;

namespace HomeStockLibrary.Controls
{
    public class HomeStockScriptControl : HomeStockControlBase
    {
        private List<HomeStockScriptRegion> scriptRegions;

        public HomeStockScriptControl()
        {
            scriptRegions = new List<HomeStockScriptRegion>();
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.RenderBeginTag("script");

            foreach (HomeStockScriptRegion region in scriptRegions)
            {
                writer.InnerWriter.Write("\n");
                if(!string.IsNullOrEmpty(region.ID))
                    writer.InnerWriter.WriteLine("//" + region.ID);
                writer.InnerWriter.WriteLine(region.BuildScript());
            }

            writer.InnerWriter.Write("\n");

            writer.RenderEndTag();
        }

        public void AddScript (HomeStockScriptRegion scriptRegion)
        {
            scriptRegions.Add(scriptRegion);
            scriptRegions.OrderBy(s => s.Priority).ThenBy(s => s.ID);
        }

        public void AppendScript(HomeStockScript script, string regionID, bool forceAdd = true)
        {
            HomeStockScriptRegion scriptRegion = scriptRegions.Find(r => r.ID == regionID);
            if (scriptRegion == null)
                scriptRegion = new HomeStockScriptRegion(regionID);
            scriptRegion.AddScript(script);
            if(!scriptRegions.Contains(scriptRegion))
                AddScript(scriptRegion);
        }

        public override void ValidateProperties()
        {
            // Nothing to validate 
        }
    }
}
