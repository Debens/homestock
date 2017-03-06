using HomeStockLibrary.Core.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Suppliers.Base
{
    public class APIEndpoint
    {
        public string Url { get; set; }

        List<APIEndpointExtension> Extensions { get; set; }

        public APIEndpoint()
        {
            Extensions = new List<APIEndpointExtension>();
        }
    }
}
