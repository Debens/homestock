using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace HomeStock.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/HomeStock.Business").Include(
                        "~/HomeStockWebFiles/Business/Core/HomeStock.js"));
        }
    }
}