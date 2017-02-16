using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.Internal
{
    public class mContainer : mNamedEntity
    {
        public virtual int HomeId { get; set; }
        public virtual mHome Home { get; set; }
        public virtual ICollection<mStock> Inventory { get; set; }
    }
}