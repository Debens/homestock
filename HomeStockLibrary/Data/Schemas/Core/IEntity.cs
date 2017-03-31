using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Schemas.Core
{
    public interface IEntity
    {
        string Name { get; set; }

        string IdentityPrefix { get; set; }

        int IdentityLength { get; set; }

        List<Column> Columns { get; set; }
    }
}
