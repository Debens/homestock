using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Button
{
    internal class ButtonAttribute : Attribute
    {
        private string backgroundColor;
        private string defaultBackgroundColout = "hs-button-default";

        public string BackgroundColor
        {
            get
            {
                return backgroundColor ?? defaultBackgroundColout;
            }
            set
            {
                backgroundColor = value ?? defaultBackgroundColout;
            }
        }
    }
}
