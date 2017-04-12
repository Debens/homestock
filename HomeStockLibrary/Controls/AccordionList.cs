using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Controls.Templates.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Controls
{
    public class AccordionList : WebControlBase
    {
        protected override void Render(HtmlTextWriter writer)
        {
            Templator pageHeader = Templator.Load("AccordionList.html").Process(this);
            writer.Write(pageHeader.ToString());
        }

        public override void ValidateProperties()
        {
            //Nothing yet.
        }
    }
}
