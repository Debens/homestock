using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Core.Base
{
    public interface IHomeStockScript
    {
        string Script(bool renderTags = false);

        string Description { get; set; }
    }
}
