using HomeStockLibrary.Controls.Base;
using HomeStockLibrary.Core;
using System;
using System.Web.UI;

namespace HomeStockLibrary.Util
{
    public class ControlAssistant
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

        public static void CascadeBlendColour(Control contorl, string colour)
        {
            appplyBlendColour(contorl, colour);
            foreach (Control subControl in contorl.Controls)
                CascadeBlendColour(subControl, colour);
        }

        public static void appplyBlendColour(Control contorl, string colour)
        {
            var webContorl = contorl as WebControlBase;
            if (webContorl != null)
            {
                webContorl.BlendColour = colour;
            }
        }
    }
}
