using HomeStockLibrary.Controls.Base;
using System.Collections.Generic;
using System.Web.UI;
using HomeStockLibrary.Core;

namespace HomeStockLibrary.Controls
{
    public class HomeStockScriptControl : HomeStockControlBase
    {
        private List<HomeStockScript> scripts;

        public HomeStockScriptControl()
        {
            scripts = new List<HomeStockScript>();
        }

        public override void RenderControl(HtmlTextWriter writer)
        {
            writer.RenderBeginTag("script");

            foreach (HomeStockScript script in scripts)
            {
                writer.InnerWriter.Write("\n");
                writer.InnerWriter.Write(script.Description);
                writer.InnerWriter.Write(script.Script());
            }

            writer.InnerWriter.Write("\n");

            writer.RenderEndTag();
        }

        public void AddScript (HomeStockScript script, bool renderAtTop = false)
        {
            int insertIndex = renderAtTop ? 0 : scripts.Count;
            scripts.Insert(insertIndex, script);
        }
    }
}
