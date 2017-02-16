using HomeStockLibrary.Controls.Base.Button;
using System.Web.UI;
using System;

namespace HomeStockLibrary.Controls
{
    [ToolboxData("<{0}:ToggleBox runat=\"server\"></{0}:ToggleBox>")]
    public class ToggleBox : ButtonBase
    {
        public string callFunction { get; set; }

        public override void RenderButtonAttributes(HtmlTextWriter writer)
        {
            
        }

        public override void RenderControl(HtmlTextWriter writer)
        {
          
        }
    }
}