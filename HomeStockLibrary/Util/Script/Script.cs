using HomeStockLibrary.Util.Script.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Util.Script
{
    public class Script : IScript
    {
        private string script;

        public Script(string script)
        {
            this.script = script;
        }

        public Script(string script, string description)
        {
            this.script = script;
            Description = description;
        }

        public string Description { get; set; }

        public string BuildScript(bool renderTags = false)
        {
            return renderTags ? Description + "\n<script type=\"text/javascript\">" + this.script + "<\\script>" : script;
        }
    }
}
