using HomeStockLibrary.Controls.Base.Button;
using System.Web.UI;

namespace HomeStockLibrary.Controls
{
    [ToolboxData("<{0}:Button runat=\"server\"></{0}:Button>")]
    public class Button : ButtonBase
    {
        public string href { get; set; }

        public override void RenderButtonAttributes(HtmlTextWriter writer)
        {
            if (!string.IsNullOrEmpty(href))
                writer.AddAttribute("href", href);
        }
    }
}
