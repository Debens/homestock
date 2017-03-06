using HomeStockLibrary.Controls.Base.Button;
using System.Web.UI;
using System;

namespace HomeStockLibrary.Controls
{
    [ToolboxData("<{0}:Button runat=\"server\"></{0}:Button>")]
    public class Button : ButtonBase
    {
        public string Url { get; set; }

        public bool OpenTab { get; set; }

        public override void RenderButtonAttributes(HtmlTextWriter writer)
        {
            if (string.IsNullOrEmpty(Url))
                Url = "#";
            writer.AddAttribute("href", Url);

            if (OpenTab)
                writer.AddAttribute("target", "_blank");
        }
    }
}
