using HomeStockLibrary.Data.Schemas.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Schemas
{
    public class Column : IColumn
    {
        public string Name { get; set; }
    }
}
