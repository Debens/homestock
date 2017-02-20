using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Button
{
    public enum ButtonType
    {
        [ButtonAttribute(BackgroundColor = "hs-button-default")]
        Default,

        [ButtonAttribute(BackgroundColor = "hs-button-new")]
        New,

        [ButtonAttribute(BackgroundColor = "hs-button-delete")]
        Delete
    }
}
