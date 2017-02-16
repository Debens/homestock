using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Button
{
    public interface IButton
    {
        string ID { get; set; }
        string Text { get; set; }
    }
}
