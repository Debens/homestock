using HomeStockLibrary.Controls.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                writer.InnerWriter.Write(script.Description);
                writer.InnerWriter.Write(script.Script());
            }

            writer.RenderEndTag();
        }

        public void AddScript (HomeStockScript script)
        {
            scripts.Add(script);
        }
    }
}
