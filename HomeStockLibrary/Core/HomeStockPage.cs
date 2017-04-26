using System;
using System.IO;
using System.Web.UI;

namespace HomeStockLibrary.Core
{
    public class HomeStockPage : Page
    {
        protected override void OnPreInit(EventArgs e)
        {
            base.OnPreInit(e);

            HomeStockContext context = new HomeStockContext();

            // TODO: Move to config
            string masterPageVirtualPath = "~/Site.Master";

            var masterPagePhysicalPath = context.MapPath(masterPageVirtualPath);
            if (File.Exists(masterPagePhysicalPath))
                MasterPageFile = masterPageVirtualPath;
            else
                throw new InvalidOperationException("Cannot set MasterPageFile: '" + masterPagePhysicalPath + "' does not exist");
        }
    }
}
