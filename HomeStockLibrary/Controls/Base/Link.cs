using HomeStockLibrary.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Controls.Base.Properties
{
    public abstract class Link : WebControlBase
    {
        protected string rawUrl;
        public string Url
        {
            get
            {
                return Resolve(rawUrl);
            }
            set { rawUrl = value; }
        }

        public static string Resolve(string url)
        {
            Page page = new HomeStockContext().Handler as Page;
            return page.ResolveUrl(url);
        }
    }
}
