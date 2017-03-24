using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.Internal
{
    public class mStock : mNamedEntity
    {
        public virtual string ContainerId { get; set; }
        public virtual mContainer Container { get; set; }
        public DateTime Expiry { get; set; }
        public List<string> Tags { get; set; }
    }
}