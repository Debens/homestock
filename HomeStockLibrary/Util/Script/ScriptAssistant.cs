using HomeStockLibrary.Controls.Resources;
using System;

namespace HomeStockLibrary.Util.Script
{
    /// <summary>
    /// A set of methods for adding a <see cref="Script"/> to the current <see cref="System.Web.UI.Page"/> in context.
    /// </summary>
    public class ScriptAssistant
    {
        private static readonly Type scriptControlType = typeof(ScriptInclusion);

        /// <summary>
        /// Finds the first matching script control of type <see cref="scriptControlType"/> using the <see cref="ScriptInclusion"/>.
        /// Throws <see cref="Exception"/> if such a contorl cannot be found.
        /// </summary>
        public static ScriptInclusion ScriptControl
        {
            get
            {
                var scriptControl = new ControlAssistant().FindPageControl((c => c.GetType() == scriptControlType)) as ScriptInclusion;
                if(scriptControl == null)
                    throw new Exception(string.Format("Failed to find script control on page of type '{0}'", scriptControlType));
                return scriptControl;
            }
        }

        public static void CreateRegion(string name, int? priority)
        {
            ScriptControl.CreateRegion(name, priority);
        }

        /// <summary>
        /// Renders a <see cref="Script"/> onto the current <see cref="System.Web.UI.Page"/>
        /// </summary>
        /// <param name="script">Script that is to be added to the page</param>
        public static void RenderScript(Script script)
        {
            var region = new ScriptRegion(script.Description);
            region.AddScript(script);  
            ScriptControl.AddScript(region);
        }

        public static void RenderScript(Script script, string regionID, bool forceCreate = true)
        {
            ScriptControl.AddScript(script, regionID, forceCreate);
        }

        /// <summary>
        /// Renders a <see cref="ScriptRegion"/> onto the current <see cref="System.Web.UI.Page"/>
        /// </summary>
        /// <param name="script">Script that is to be added to the page</param>
        public static void RenderScript(ScriptRegion scriptRegion)
        {
            ScriptControl.AddScript(scriptRegion);
        }
    }
}
