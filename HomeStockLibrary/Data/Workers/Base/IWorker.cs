using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Data.Workers.Base
{
    public interface IWorker
    {
        string ID { get; set; }

        string ArchiveID { get; set; }
    }
}
