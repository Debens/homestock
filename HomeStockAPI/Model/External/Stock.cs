using HomeStock.Model.External.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.External
{
    public class Stock : NamedEntity
    {
        public string ContainerId { get; set; }
        public string Container { get; set; }
        public DateTime Expiry { get; set; }
        public List<string> Tags { get; set; }
    }
}