using System;

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
