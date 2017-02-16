using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Core
{
    public class HomeStockPage : Page
    {
        public Control FindControl(string ID)
        {

        }

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
                throw new InvalidOperationException("Cannot set MasterPageFile: file '" + masterPagePhysicalPath + "' does not exist");
        }
    }
}
