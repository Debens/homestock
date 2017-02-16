using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HomeStockLibrary.Core.Base
{
    internal interface IHomeStockContext
    {
        IDictionary Items { get; }

        IHttpHandler Handler { get; }

        string MapPath(string path);

        string ToAbsolutePath(string path);

        string UrlPathEncode(string urlPath);
    }
}
