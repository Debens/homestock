using HomeStock.Data;
using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Repository
{
    public class StockRepository : BaseHomeStockRepository<mStock>
    {
        public StockRepository(HomeStockContext context) : base(context)
        {

        }
    }
}