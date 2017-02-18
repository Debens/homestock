using HomeStockLibrary.Controls;
using HomeStockLibrary.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;

namespace HomeStockLibrary.Util
{
    public class HomeStockScriptAssistant
    {
        public static void RenderScript(HomeStockScript script)
        {
            Controls.HomeStockScriptControl assistant = new Core.HomeStockControlAssistant().FindPageControl((c => c.ID == "SiteMasterScriptAssistant")) as Controls.HomeStockScriptControl;

            if (assistant != null)
            {
                assistant.AddScript(script);
            } else
            {
                //TODO : HomeStockException
                throw new Exception("Failed to find the current page's script assistant");
            }
        }
    }
}
