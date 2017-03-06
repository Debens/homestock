using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Exceptions
{
    public class HomeStockControlException : Exception
    {
        public HomeStockControlException()
        {
        }

        public HomeStockControlException(string message) : base(message)
        {

        }

        public HomeStockControlException(string message, Exception inner) : base(message, inner)
        { 

        }
    }
}
