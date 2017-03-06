using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Exceptions;
using HomeStockLibrary.Util.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Core
{
    public abstract class HomeStockScriptObject : HomeStockControlBase
    {
        public abstract string GenerateCreationString();

        protected override void Render(HtmlTextWriter writer)
        {
            string creationString = GenerateCreationString();
            Validate(creationString, new HomeStockControlException(string.Format("Control '{0}', of type {1}, GenerateCreationString returned an invalid result", this.ID, this.GetType())));

            HomeStockScriptAssistant.RenderScript(new HomeStockScript(creationString));
        }
    }
}
