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

        public ButtonAttribute()
        {
            backgroundColor = "ThisShouldBeTheDefaultButtonBackgroundColor";
        }

        public string BackgroundColor
        {
            get
            {
                return backgroundColor;
            }
            set
            {
                backgroundColor = value ?? string.Empty;
            }
        }
    }
}
