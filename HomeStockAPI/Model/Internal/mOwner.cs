using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Model.Internal
{
    public class mOwner : mNamedEntity
    {
        public virtual IEnumerable<mHome> Homes { get; set; }
        public virtual IEnumerable<mTag> TagCollection { get; set; }
    }
}