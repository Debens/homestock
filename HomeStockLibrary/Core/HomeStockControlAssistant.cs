using System;
using System.Web.UI;

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
