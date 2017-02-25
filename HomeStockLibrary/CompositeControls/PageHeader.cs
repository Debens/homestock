using HomeStockLibrary.Controls;
using HomeStockLibrary.Controls.Base;
using System.Web.UI;

namespace HomeStockLibrary.CompositeControls
{
    public class PageHeader : HomeStockControlBase
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

        public override void RenderControl(HtmlTextWriter writer)
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
    }
}
