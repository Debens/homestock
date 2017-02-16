using HomeStock.Data;
using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Repository
{
    public class ContainerRepository : BaseHomeStockRepository<mContainer>
    {
        public ContainerRepository(HomeStockContext context) : base(context)
        {

        }
    }
}