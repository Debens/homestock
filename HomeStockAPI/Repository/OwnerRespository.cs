using HomeStock.Data;
using HomeStock.Model.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Repository
{
    public class OwnerRespository : BaseHomeStockRepository<mOwner>
    {
        public OwnerRespository(HomeStockContext context) : base(context)
        {

        }
    }
}