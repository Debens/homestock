using HomeStockLibrary.Controls.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Controls
{
    public class PageSerpoator : HomeStockControlBase
    {
        private string defaultText = "~";

        private string _text;
        public string  Text
        {
            get
            {
                return !string.IsNullOrWhiteSpace(_text) ?  _text :  defaultText;
            }
            set
            {
                _text = value;
            }
        }

        public override void ValidateProperties()
        {
            // Nothing to validate
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.AddAttribute("class", "hs-page-seporator");
            writer.RenderBeginTag("div");

            writer.RenderBeginTag("span");

            writer.InnerWriter.Write(Text);

            writer.RenderEndTag();

            writer.RenderEndTag();
        }
    }
}
