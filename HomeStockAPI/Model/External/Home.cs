using HomeStock.Model.External.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeStock.Model.External
{
    public class Home : NamedEntity
    {
        public int OwnerId { get; set; }
        public string Owner { get; set; }
    }
}