using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.Internal
{
    public class mHome : mNamedEntity
    {
        public virtual string OwnerId { get; set; }
        public virtual mOwner Owner { get; set; }
        public virtual ICollection<mContainer> Containers { get; set; }
    }
}