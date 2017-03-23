using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Suppliers.Base
{
    interface IWebSQLSupplier
    {
        string TableName { get; set; }
    }
}
