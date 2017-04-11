using HomeStockLibrary.Controls;
using HomeStockLibrary.Controls.Base;
using System.Web.UI;
using System;

namespace HomeStockLibrary.CompositeControls
{
    public class PageHeader : WebControlBase
    {
        public string Title { get; set; }

        public string SeporatorText { get; set; }

        public string Description { get; set; }

        private PageSerpoator seporator { get; set; }

        public PageHeader()
        {
            seporator = new PageSerpoator();
            seporator.Text = SeporatorText;
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.AddAttribute("class", "hs-page-header");
            writer.RenderBeginTag("div");

            writer.AddAttribute("class", "hs-page-header-title");
            writer.RenderBeginTag("h1");
            writer.InnerWriter.Write(Title);

            writer.RenderBeginTag("br");
            writer.RenderEndTag();

            writer.RenderEndTag();

            writer.AddAttribute("class", "hs-page-header-description");
            writer.RenderBeginTag("p");
            writer.InnerWriter.Write(Description);
            writer.RenderEndTag();

            seporator.RenderControl(writer);

            writer.RenderEndTag();
        }

        public override void ValidateProperties()
        {
            Validate(Title, "Title");
        }
    }
}
