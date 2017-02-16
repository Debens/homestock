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
    public class HomeStockScriptRenderer
    {
        public static void RenderScript(HomeStockScript script)
        {
            HomeStockScriptAssistant assistant = new HomeStockControlAssistant().FindPageControl("SiteMasterScriptAssistant") as HomeStockScriptAssistant;

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
