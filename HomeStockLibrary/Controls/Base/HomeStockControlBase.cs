using System.Web.UI;
using System.Web.UI.WebControls;

namespace HomeStockLibrary.Controls.Base
{
    public abstract class HomeStockControlBase : WebControl
    {
        public abstract override void RenderControl(HtmlTextWriter writer);
    }
}
