using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Suppliers.Base
{
    public interface IAPISupplier : ISupplier
    {
        string EndPoint { get; set; }
    }
}
