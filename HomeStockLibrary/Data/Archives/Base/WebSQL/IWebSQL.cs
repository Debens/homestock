using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Archives.Base.WebSQL
{
    interface IWebSQL
    {
        string TableName { get; set; }
    }
}
