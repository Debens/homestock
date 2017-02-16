using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Button
{
    public enum ButtonType
    {
        [ButtonAttribute(BackgroundColor = "defaultBtn")]
        Default,

        [ButtonAttribute(BackgroundColor = "newBtn")]
        New,

        [ButtonAttribute(BackgroundColor = "deleteBtn")]
        Delete
    }
}
