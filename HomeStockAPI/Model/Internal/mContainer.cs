using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Model.Internal
{
    public class mContainer : mNamedEntity
    {
        public virtual string HomeId { get; set; }
        public virtual mHome Home { get; set; }
        public virtual ICollection<mStock> Inventory { get; set; }
    }
}