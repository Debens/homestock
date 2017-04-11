using HomeStockLibrary.Controls.Base;
using System.Collections.Generic;
using System.Web.UI;
using HomeStockLibrary.Util.Script;
using System.Linq;

namespace HomeStockLibrary.Controls.Resources
{
    public class ScriptInclusion : WebControlBase
    {
        private List<ScriptRegion> scriptRegions;

        public ScriptInclusion()
        {
            scriptRegions = new List<ScriptRegion>();
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.RenderBeginTag("script");

            foreach (ScriptRegion region in scriptRegions)
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
                AddScript(new ScriptRegion(name, priority));
                return true;
            }

            return false;
        }

        public void AddScript (ScriptRegion scriptRegion)
        {
            if (!scriptRegions.Contains(scriptRegion))
            {
                scriptRegions.Add(scriptRegion);
                scriptRegions = scriptRegions.OrderByDescending(s => s.Priority).ThenBy(s => s.ID).ToList();
            }
        }

        public void AddScript(Script script, string regionID, bool forceAdd = true)
        {
            CreateRegion(regionID, null);
            ScriptRegion scriptRegion = scriptRegions.Find(r => r.ID == regionID);
            scriptRegion.AddScript(script);
        }

        public override void ValidateProperties()
        {
            // Nothing to validate 
        }
    }
}
