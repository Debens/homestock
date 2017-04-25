using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Model.Internal
{
    public class mTag : mNamedEntity
    {
        public virtual string OwnerId { get; set; }
        public virtual mOwner Owner { get; set; }
        public virtual IEnumerable<mStock> Stock { get; set; }
    }
}