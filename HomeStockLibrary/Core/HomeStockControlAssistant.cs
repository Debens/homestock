using HomeStockLibrary.Controls.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HomeStockLibrary.Core
{
    public class HomeStockControlAssistant
    {
        public Control FindPageControl(Func<Control, bool> isMatch)
        {
            Page page = new HomeStockContext().Handler as Page;

            Control result = null;
            if (page != null) {
                foreach(Control pageDescendant in page.Controls)
                {
                    if(isMatch(pageDescendant))
                    {
                        result = pageDescendant;
                        break;
                    }

                    result = FindControlDescendant(isMatch, pageDescendant);
                }
            }

            return result;
        }

        public Control FindControlDescendant(Func<Control, bool> isMatch, Control control)
        {
            Control result = null;

            foreach (Control childControl in control.Controls)
            {
                if(isMatch(childControl))
                {
                    result = childControl;
                    break;
                } else
                {
                    FindControlDescendant(isMatch, childControl);
                }
            }

            return result;
        }
    }
}
