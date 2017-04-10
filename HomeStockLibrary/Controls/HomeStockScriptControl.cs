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

        public bool CreateRegion(string name, int? priority)
        {
            if (scriptRegions.Find(r => r.ID == name) == null)
            {
                AddScript(new HomeStockScriptRegion(name, priority));
                return true;
            }

            return false;
        }

        public void AddScript (HomeStockScriptRegion scriptRegion)
        {
            if (!scriptRegions.Contains(scriptRegion))
            {
                scriptRegions.Add(scriptRegion);
                scriptRegions = scriptRegions.OrderByDescending(s => s.Priority).ThenBy(s => s.ID).ToList();
            }
        }

        public void AddScript(HomeStockScript script, string regionID, bool forceAdd = true)
        {
            CreateRegion(regionID, null);
            HomeStockScriptRegion scriptRegion = scriptRegions.Find(r => r.ID == regionID);
            scriptRegion.AddScript(script);
        }

        public override void ValidateProperties()
        {
            // Nothing to validate 
        }
    }
}
