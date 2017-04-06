using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Button
{
    public enum ButtonType
    {
        [Styling(ClassName = "button-default")]
        Default,

        [Styling(ClassName = "hs-button-new")]
        New,

        [Styling(ClassName = "hs-button-delete")]
        Delete
    }
}
