using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Util.Script.Base
{
    public interface IScript
    {
        string BuildScript(bool renderTags = false);
    }
}
