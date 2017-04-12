using HomeStockLibrary.Controls;
using HomeStockLibrary.Controls.Base;
using System.Web.UI;
using System;
using HomeStockLibrary.Controls.Templates.Core;

namespace HomeStockLibrary.Controls
{
    public class PageHeader : WebControlBase
    {
        public string Title { get; set; }

        private string defaultSeporatorText = "~";
        private string _seporatorText;
        public string SeporatorText
        {
            get
            {
                return _seporatorText ?? defaultSeporatorText;
            }
            set
            {
                _seporatorText = value;
            }
        }

        public string Description { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            Templator pageHeader = Templator.Load("PageHeader.html").Process(this);
            writer.Write(pageHeader.ToString());
        }

        public override void ValidateProperties()
        {
            Validate(Title, "Title");
        }
    }
}
