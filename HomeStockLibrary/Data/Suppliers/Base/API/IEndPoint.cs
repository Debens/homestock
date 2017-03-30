using System.Collections.Generic;
using HomeStockLibrary.Data.Suppliers.API;

namespace HomeStockLibrary.Data.Suppliers.Base.API
{
    public interface IEndPoint
    {
        string Url { get; set; }

        List<EndPointFragment> EndPointFragments { get; set; }
    }
}
