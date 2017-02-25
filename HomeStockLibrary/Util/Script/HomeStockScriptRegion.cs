using HomeStockLibrary.Core;
using HomeStockLibrary.Util.Script.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Util.Script
{
    public class HomeStockScriptRegion : IHomeStockScript
    {
        private const int defaultPriority = 10;
        private const int minPriority = 0;
        private const int maxPriority = 100;

        private int _priority;
        private List<IHomeStockScript> scripts { get; set; }

        public HomeStockScriptRegion(string id)
        {
            this.ID = id;
            this.Priority = _priority;
            scripts = new List<IHomeStockScript>();
        }

        public HomeStockScriptRegion(string id, int priority)
        {
            this.ID = id;
            this.Priority = priority;
            scripts = new List<IHomeStockScript>();
        }

        public string ID { get; set; }

        public int Priority
        {
            get
            {
                return _priority;
            }
            set
            {
                _priority = Math.Min(Math.Max(minPriority, value), maxPriority);
            }
        }

        public void AddScript(IHomeStockScript script)
        {
            scripts.Add(script);
        }

        public void AddScript(IEnumerable<IHomeStockScript> scripts)
        {
            this.scripts.AddRange(scripts);
        }

        public string BuildScript(bool renderTags = false)
        {
            var idString = string.IsNullOrEmpty(ID) ? "" : string.Format(" ID '{0}'", ID);
            string scriptString = "//RegionStart" + idString + "\n";

            foreach (var script in scripts)
            {
                scriptString += script.BuildScript();
            }
            
            scriptString += "\n//RegionEnd"  + idString;

            return renderTags ? "<script type=\"text/javascript\">" + scriptString + "<\\script>" : scriptString;
        }
    }
}
