using HomeStockLibrary.Core.Base;
using System.Collections;
using System.Web;
using System;

namespace HomeStockLibrary.Core
{
    internal class HomeStockContext : IHomeStockContext
    {
        public static HttpContext Currnet
        {
            get { return HttpContext.Current; }
        }

        public IDictionary Items
        {
            get { return Currnet.Items; }
        }

        public IHttpHandler Handler
        {
            get { return Currnet.Handler; }
        }

        public string MapPath(string path)
        {
            return Currnet.Server.MapPath(path);
        }

        public string ToAbsolutePath(string path)
        {
            return VirtualPathUtility.ToAbsolute(path);
        }

        public string UrlPathEncode(string urlPath)
        {
            return Currnet.Server.UrlPathEncode(urlPath);
        }
    }
}
