using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Schemas.Core
{
    public interface ISchema
    {
        string ID { get; set; }

        List<Entity> Entitiies { get; set; }
    }
}
