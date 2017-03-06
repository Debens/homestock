using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeStockLibrary.Exceptions
{
    public class HomeStockException : Exception
    {
        public HomeStockException()
        {
        }

        public HomeStockException(string message) : base(message)
        {

        }

        public HomeStockException(string message, Exception inner) : base(message, inner)
        {

        }
    }
}
