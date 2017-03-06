using HomeStockLibrary.Controls;
using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script.Base;
using System;

namespace HomeStockLibrary.Util.Script
{
    /// <summary>
    /// A set of methods for adding a <see cref="HomeStockScript"/> to the current <see cref="System.Web.UI.Page"/> in context.
    /// </summary>
    public class HomeStockScriptAssistant
    {
        private static readonly Type scriptControlType = typeof(HomeStockScriptControl);

        /// <summary>
        /// Finds the first matching script control of type <see cref="scriptControlType"/> using the <see cref="HomeStockScriptControl"/>.
        /// Throws <see cref="Exception"/> if such a contorl cannot be found.
        /// </summary>
        public static HomeStockScriptControl ScriptControl
        {
            get
            {
                var scriptControl = new HomeStockControlAssistant().FindPageControl((c => c.GetType() == scriptControlType)) as HomeStockScriptControl;
                if(scriptControl == null)
                    throw new Exception(string.Format("Failed to find script control on page of type '{0}'", scriptControlType));
                return scriptControl;
            }
        }

        /// <summary>
        /// Renders a <see cref="HomeStockScript"/> onto the current <see cref="System.Web.UI.Page"/>
        /// </summary>
        /// <param name="script">Script that is to be added to the page</param>
        public static void RenderScript(HomeStockScript script)
        {
            var region = new HomeStockScriptRegion(script.Description);
            region.AddScript(script);  
            ScriptControl.AddScript(region);
        }

        /// <summary>
        /// Renders a <see cref="HomeStockScript"/> onto the current <see cref="System.Web.UI.Page"/>
        /// </summary>
        /// <param name="script">Script that is to be added to the page</param>
        public static void RenderScript(HomeStockScriptRegion scriptRegion)
        {
            ScriptControl.AddScript(scriptRegion);
        }

        public static void RenderScriptTo(HomeStockScript script, string regionID, bool forceCreate = true)
        {
            ScriptControl.AppendScript(script, regionID, forceCreate);
        }
    }
}
