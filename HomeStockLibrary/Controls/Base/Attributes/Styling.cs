using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Controls.Base.Attributes
{
    internal class Styling : Attribute
    {
        private string _className;

        public string ClassName
        {
            get
            {
                return _className ?? string.Empty;
            }
            set
            {
                _className = value ?? string.Empty;
            }
        }
    }
}
