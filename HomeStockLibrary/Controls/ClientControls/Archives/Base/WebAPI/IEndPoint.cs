using System.Collections.Generic;

namespace HomeStockLibrary.Controls.ClientControls.Archives.Base.WebAPI
{
    public interface IEndPoint
    {
        string Url { get; set; }
        List<EndPointFragment> EndPointFragments { get; set; }
    }
}
