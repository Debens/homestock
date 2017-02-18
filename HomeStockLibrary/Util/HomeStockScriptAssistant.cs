using HomeStockLibrary.Controls;
using HomeStockLibrary.Core;
using System;

namespace HomeStockLibrary.Util
{
    public class HomeStockScriptAssistant
    {
        public static void RenderScript(HomeStockScript script)
        {
            HomeStockScriptControl assistant = new HomeStockControlAssistant().FindPageControl((c => c.ID == "SiteMasterScriptAssistant")) as Controls.HomeStockScriptControl;

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
