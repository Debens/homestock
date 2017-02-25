using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Util.Script.Base
{
    public interface IHomeStockScript
    {
        string BuildScript(bool renderTags = false);
    }
}
