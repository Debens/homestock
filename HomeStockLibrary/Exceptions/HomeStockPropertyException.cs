using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Exceptions
{
    public class HomeStockPropertyException : Exception
    {
        public HomeStockPropertyException()
        {
        }

        public HomeStockPropertyException(string message) : base(message)
        {

        }

        public HomeStockPropertyException(string message, Exception inner) : base(message, inner)
        {

        }
    }
}
