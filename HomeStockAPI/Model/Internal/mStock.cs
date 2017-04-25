using HomeStockAPI.Model.Internal.Base;
using System;
using System.Collections.Generic;

namespace HomeStockAPI.Model.Internal
{
    public class mStock : mNamedEntity
    {
        public virtual string ContainerId { get; set; }
        public virtual mContainer Container { get; set; }
        public DateTime Expiry { get; set; }
        public List<string> Tags { get; set; }
    }
}