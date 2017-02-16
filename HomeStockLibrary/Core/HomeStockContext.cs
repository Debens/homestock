using HomeStockLibrary.Core.Base;
using System.Collections;
using System.Web;
using System;

namespace HomeStockLibrary.Core
{
    internal class HomeStockContext : IHomeStockContext
    {
        protected HttpContext Context
        {
            get { return HttpContext.Current; }
        }

        public IDictionary Items
        {
            get { return Context.Items; }
        }

        public IHttpHandler Handler
        {
            get { return Context.Handler; }
        }

        public string MapPath(string path)
        {
            return Context.Server.MapPath(path);
        }

        public string ToAbsolutePath(string path)
        {
            return VirtualPathUtility.ToAbsolute(path);
        }

        public string UrlPathEncode(string urlPath)
        {
            return Context.Server.UrlPathEncode(urlPath);
        }
    }
}
