using System.Collections.Generic;

namespace HomeStockLibrary.Data.Suppliers.Base.WebAPI
{
    public interface IEndPoint
    {
        string Url { get; set; }

        List<EndPointFragment> EndPointFragments { get; set; }
    }
}
